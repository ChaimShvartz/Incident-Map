import { usersRepo } from "../repositories/users.repo.js";
import { hash, compare } from "bcrypt";
import { generateToken } from "../services/user.services.js";

export const register = async (req, res) => {
    const { email, password } = req.body;
    const userByEmail = await usersRepo.getUser({ email });
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
    const id = await usersRepo.insertUser({ ...user, hashedPassword });
    const token = generateToken({ id, email, role: "user" });
    res.status(201).json({
        success: true,
        data: { user: { id, ...user }, token },
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const { hashedPassword, ...userProps } = await usersRepo.getUser({ email });
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
    const token = generateToken({ id: userProps.id, email, role: "user" });
    res.json({
        success: true,
        data: { user: { ...userProps }, token },
    });
};

export const getUser = async (req, res) => {
    const { id } = req.user;
    const user = await usersRepo.getUser({ id });
    if (!user)
        throw Object.assign(new Error(), {
            status: 404,
            message: "User not found",
        });
    const { hashedPassword, ...userProps } = user;
    res.json({
        success: true,
        data: { user: { ...userProps } },
    });
};
