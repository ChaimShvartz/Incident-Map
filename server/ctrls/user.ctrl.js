import { usersRepo } from "../repositories/index.repo.js";
import { hash, compare } from "bcrypt";
import { generateToken } from "../services/user.services.js";

export const register = async (req, res) => {
    const { email, password } = req.body;
    const userByEmail = await usersRepo.getItem({ email });
    if (userByEmail)
        throw Object.assign(new Error(), {
            status: 409,
            message: "Email already exists",
        });
    const hashedPassword = await hash(password, 10);
    const user = {
        email,
        role: "user",
        createdAt: new Date().toLocaleTimeString("he"),
    };
    const id = await usersRepo.insert({ ...user, hashedPassword });
    const token = generateToken(email, "user");
    res.status(201).json({
        success: true,
        data: { user: { id, ...user }, token },
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const { hashedPassword, ...userProps } = await usersRepo.getItem({ email });
    if (!hashedPassword)
        throw Object.assign(new Error(), {
            status: 404,
            message: "User not found",
        });
    const isMatch = await compare(password, hashedPassword);
    if (!isMatch)
        throw Object.assign(new Error(), {
            status: 401,
            message: "Wrong password",
        });
    const token = generateToken(email, "user");
    res.json({
        success: true,
        data: { user: { ...userProps }, token },
    });
};

export const getUser = (req, res) => {};
