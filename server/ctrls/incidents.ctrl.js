import { incidentsRepo } from "../repositories/incidents.repo.js";

export const getIncidents = async (/**@type {Request} */ req, res) => {
    const incidents = await incidentsRepo.getIncidents(req.category);
    res.json({ success: true, data: incidents });
};

export const getIncident = async (req, res) => {
    const { id } = req.params;
    const incident = await incidentsRepo.getIncident({ id });
    if (!incident) throw Object.assign(new Error(), "Incident not found");
    res.json({ success: true, data: incident });
};

export const createIncident = async (req, res) => {
    let incident = {
        ...req.body,
        status: "open",
        createdBy: req.user.id,
        createdAt: new Date().toLocaleDateString('he')
    };
    incident = await incidentsRepo.insertIncident(incident);
    res.status(201).json({ success: true, data: incident });
};

export const updateIncident = async (req, res) => {
    const {id} = req.params
    const data = req.body
    const incident = await incidentsRepo.updateIncident({id}, {...data, updatedAt: new Date().toLocaleDateString('he')})    
    res.json({ success: true, data: incident });

}

export const deleteIncident = async (req, res) => {
    const {id} = req.params
    const incident = await incidentsRepo.deleteIncident({id})    
    res.json({ success: true, data: incident });
}