import express from "express";
import { User } from "./db.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { SignupSchema, SignInSchema } from "./types/index.js";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/signin", async (req, res) => {
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
            User.password
        );

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.json({
            message: "Sign-in successful",
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Some internal error"
        });
        return;
    }
});

app.listen(process.env.PORT || 8000, async () => {
    console.log(`Server started on port ${PORT}`);

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MONGODB");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
});
