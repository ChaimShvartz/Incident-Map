import { createRepo } from "./base.repo.js";
import { db } from "../db/db.js";

export const usersRepo = createRepo(db.collection("users"));
export const incidentsRepo = createRepo(db.collection("incidents"));
