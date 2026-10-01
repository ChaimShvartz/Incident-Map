import { verifyToken } from "../services/user.services.js";

export const auth = (req, _res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        throw Object.assign(new Error(), {
            status: 400,
            message: "Token is missing",
        });

    const tokenParts = authorization?.split(" ");
    if (tokenParts.length !== 2 && tokenParts[0] !== "Bearer")
        throw Object.assign(new Error(), {
            status: 403,
            message: "Token pattern must be 'Bearer <token>'",
        });
    const user = verifyToken(tokenParts[1]);
    if (!user)
        throw Object.assign(new Error(), {
            status: 403,
            message: "Invalid token",
        });
    req.user = user;
    next();
};
