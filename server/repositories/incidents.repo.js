import { createRepo } from "./base.repo.js";
import { db } from "../db/db.js";

const baseRepo = createRepo(db.collection("incidents"));

export const incidentsRepo = {
    getIncidents: baseRepo.get,
    getIncident: baseRepo.getItem,
    insertIncident: baseRepo.insert,
    updateIncident: baseRepo.update,
    deleteIncident: baseRepo.remove,
};
