import { Router } from "express";
import { ownershipAuth } from "../middlewares/ownershipAuth.js";
import { validation } from "../middlewares/validatation.js";
import { Category, Incident, IncidentUpdate } from "../models/incident.model.js";
import { createIncident, deleteIncident, getIncident, getIncidents, updateIncident } from "../ctrls/incidents.ctrl.js";

export const router = Router();
const cateforyValidation = validation(Category, "query");
const createIncidentValidation = validation(Incident);
const updateIncidentValidation = validation(IncidentUpdate);

router.get("", cateforyValidation, getIncidents);
router.get("/:id", getIncident);
router.post("",createIncidentValidation, createIncident);
router.patch("/:id", ownershipAuth, updateIncidentValidation, updateIncident);
router.delete("/:id", ownershipAuth, deleteIncident);
