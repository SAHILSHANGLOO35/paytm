import { Router } from "express";
import { SignupSchema, SignInSchema, updateUserSchema } from "../types/index.js";
import { Account, User } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/index.js";
import mongoose from "mongoose";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const parsedData = SignupSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Validation failed",
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    try {
        const existingUser = await User.findOne({
            email: parsedData.data.email,
        });

        if (existingUser) {
            res.json({
                message: "User with this email already exists!",
            });
            return;
        }

        const user = await User.create({
            firstName: parsedData.data.firstName,
            lastName: parsedData.data.lastName,
            email: parsedData.data.email,
            password: hashedPassword,
        });

        await Account.create({
            userId: user._id,
            balance: 1 + Math.random() * 1000,
        });

        res.status(200).json({
            message: "User created successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Some internal error",
            error: error.message,
        });
    }
});

userRouter.post("/signin", async (req, res) => {
    const parsedData = SignInSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(403).json({
            message: "Validation failed",
        });
        return;
    }

    try {
        const user = await User.findOne({ email: parsedData.data.email });

        if (!user) {
            res.status(400).json({
                message: "User not found",
            });
            return;
        }

        const passwordMatch = await bcrypt.compare(
            parsedData.data.password,
            user.password
        );

        if (!passwordMatch) {
            res.status(400).json({
                message: "Invalid password",
            });
            return;
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.json({
            message: "Sign-in successful",
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Some internal error",
        });
        return;
    }
});

userRouter.put("/", authMiddleware, async (req, res) => {
    const parsedData = updateUserSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(403).json({
            message: "Error updating user",
            errors: parsedData.error.format(),
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

        await User.updateOne(
            { _id: req.userId },
            { ...parsedData.data, password: hashedPassword },
            req.body
        );
        res.status(200).json({
            message: "User updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Some internal error",
        });
    }
});

userRouter.get("/bulk", authMiddleware, async (req, res) => { 
    const filter = req.query.filter || "";
    const loggedInUserId = new mongoose.Types.ObjectId(req.userId);

    const users = await User.find({
        $and: [
            { _id: { $ne: loggedInUserId } },
            {
                $or: [
                    { firstName: { $regex: filter, $options: "i" } },
                    { lastName: { $regex: filter, $options: "i" } },
                ],
            }
        ]
    });

    res.json({
        user: users.map((user) => ({
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        })),
    });
});

