import jwt from "jsonwebtoken";

const {SECRET_JWT} = process.env;

export const generateToken = (email, role) => {
    const token = jwt.sign({ email, role }, SECRET_JWT);
    return token;
};

export const verifyToken = (token) => {
    const res = jwt.verify(token, SECRET_JWT);
    return res.payload;
};
