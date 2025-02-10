import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { router } from "./routes/index.js";

configDotenv();

const app = express();
app.use(express.json());

app.use("/api/v1", router);

app.listen(process.env.PORT || 8000, async () => {
    console.log(`Server started on port ${process.env.PORT || 8000}`);

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MONGODB");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
});
