import z from "zod";

const CATEGORIES = z.literal(["fire", "flood", "accident", "medical", "other"]);

export const Category = z.object({ category: CATEGORIES.optional() });
export const Incident = z.object({
    title: z.string("Title must be a string"),
    description: z.string("Description must be a string"),
    category: CATEGORIES,
    location: z.object({
        lat: z.number("Lat must be a number"),
        lng: z.number("Lng must be a number"),
    }),
});
export const IncidentUpdate = Incident.extend({
    status: z.literal(["in_progress", "closed"]),
}).partial();
