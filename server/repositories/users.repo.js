import { createRepo } from "./base.repo.js";
import { db } from "../db/db.js";


const baseRepo = createRepo(db.collection("users"));

export const usersRepo = {
    getUser: baseRepo.getItem,
    insertUser: baseRepo.insert,
};
