import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";

export const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Login successful", username });
    })().catch(next);
});