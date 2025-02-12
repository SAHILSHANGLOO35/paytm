import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const accountSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
    },
});

export const User = mongoose.model("User", userSchema);
export const Account = mongoose.model("Account", accountSchema);