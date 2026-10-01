import z from "zod";

export const User = z.object({
    email: z.email("Invalid email"),
    password: z
        .string("Password must be a string")
        .min(8, { error: "Too short" }),
});
