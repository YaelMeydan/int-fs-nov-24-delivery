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
        const exists = await User.findOne({ username });
        if (exists) {
            return res.status(409).json({ message: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered" });
    })().catch(next);
});