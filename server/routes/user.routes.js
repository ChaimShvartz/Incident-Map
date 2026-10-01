import { Router } from "express";
import { User } from "../models/user.model.js";
import { validation } from "../middlewares/validatation.js";
import { getUser, login, register } from "../ctrls/user.ctrl.js";

export const router = Router();
const userValidation = validation(User);

router.get("/me", getUser);
router.post("/register", userValidation, register);
router.post("/login", userValidation, login);
