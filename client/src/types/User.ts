export interface User {
    id: string;
    email: string;
    role: "user" | "admin";
    createdAt: string;
}

export interface CreatingRes {
    user: User;
    token: string;
}

export interface GetUserRes {
    user: User;
}
