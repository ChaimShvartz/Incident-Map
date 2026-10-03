import { incidentsRepo } from "../repositories/incidents.repo.js";

export const ownershipAuth = async (req, _res, next) => {
    const { id: userId, role } = req.user;
    const { id } = req.params;
    const incident = await incidentsRepo.getIncident({ id });
    if (!incident)
        throw Object.assign(new Error(), {
            status: 404,
            message: "Incident not found",
        });        
    if (incident.createdBy !== userId && role !== "admin")
        throw Object.assign(new Error(), {
            status: 403,
            message: "You are not allowed",
        });
    req.incident = incident;
    next();
};
