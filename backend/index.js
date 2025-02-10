import express from "express";
import { User } from "./db.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                message: "User with this email already exists!",
            });
        }
        await User.create({
            firstName,
            lastName,
            email,
            password,
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

// app.post("/signin", (req, res) => {

// });

app.listen(3000, async () => {
    console.log("Server started on port 3000");

    try {
        await mongoose.connect("mongodb+srv://sahilshangloo35:root@cluster0.ulniw.mongodb.net/paytm")
        console.log("Connected to MONGODB");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
});
