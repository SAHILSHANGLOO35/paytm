import { Router } from "express";
import { authMiddleware } from "../middleware/index.js";
import { Account } from "../db.js";

export const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({userId: req.userId});
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

accountRouter.post("/transfer", (req, res) => {
    
})
