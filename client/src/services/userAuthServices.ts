import type { FormType } from "../components/Form";
import type { ResData } from "../types/ResData";
import type { CreatingRes, GetUserRes, User } from "../types/User";

export const register = async (userForm: FormType) => {
    const res = await fetch("http://localhost:3000/auth/register", {
        body: JSON.stringify(userForm),
        headers: { "Content-type": "application/json" },
        method: "POST",
    });
    const resData = (await res.json()) as ResData<CreatingRes>;
    if (!resData.success) throw new Error(resData.message);
    const { token, user } = resData.data;
    localStorage.setItem("token", token);
    return user;
};

export const login = async (userForm: FormType) => {
    const res = await fetch("http://localhost:3000/auth/login", {
        body: JSON.stringify(userForm),
        headers: { "Content-type": "application/json" },
        method: "POST",
    });
    const resData = (await res.json()) as ResData<CreatingRes>;
    if (!resData.success) throw new Error(resData.message);
    const { token, user } = resData.data;
    localStorage.setItem("token", token);
    return user;
};

export const getUser = async (token: string) => {
    const res = await fetch("http://localhost:3000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
    });
    const resData = (await res.json()) as ResData<GetUserRes>;
    if (!resData.success) throw new Error(resData.message);
    return resData.data.user;
};
