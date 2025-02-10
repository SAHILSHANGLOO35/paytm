import { Router } from "express";
import { SignupSchema, SignInSchema } from "../types/index.js";
import { User } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            return res.json({
                message: "User with this email already exists!",
            });
        }
        await User.create({
            firstName: parsedData.data.firstName,
            lastName: parsedData.data.lastName,
            email: parsedData.data.email,
            password: hashedPassword,
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
