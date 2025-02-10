import { Router } from "express";
import { userRouter } from "./user.js";

export const router = Router();

router.use("/user", userRouter);