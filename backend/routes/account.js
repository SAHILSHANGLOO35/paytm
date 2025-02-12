import { Router } from "express";
import { authMiddleware } from "../middleware/index.js";
import { Account } from "../db.js";
import mongoose from "mongoose";

export const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        const balance = account.balance;

        res.status(200).json({
            balance,
        });
    } catch (error) {
        res.status(500).json({
            message: "Some internal error",
        });
    }
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    try {
        const account = await Account.findOne({ userId: req.userId }).session(
            session
        );

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insuffecient balance",
            });
        }
        const toAccount = await Account.findOne({ userId: to }).session(
            session
        );

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account",
            });
        }
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session);
        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);

        await session.commitTransaction();

        res.status(200).json({
            message: "Transfer successful",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Some internal error",
        });
    }
});
