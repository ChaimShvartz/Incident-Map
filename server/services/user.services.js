import jwt from "jsonwebtoken";

const { SECRET_JWT } = process.env;

export const generateToken = ({ ...props }) => {
    return jwt.sign({ ...props }, SECRET_JWT);
};

export const verifyToken = (token) => {
    return jwt.verify(token, SECRET_JWT);
};
