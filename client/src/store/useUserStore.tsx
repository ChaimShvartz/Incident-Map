import type { User } from "../types/User";
import { getUser } from "../services/userAuthServices";
import { create } from "zustand";
import { Navigate } from "react-router-dom";

interface UserState {
    user: User | null;
    error: string | null;
    isLoading: boolean;
    setUser: (user: User) => void;
    setError: (error: string) => void;
    initStore: () => void;
}

export const useUserStore = create<UserState>((set) => {
    return {
        user: null,
        error: null,
        isLoading: true,
        setUser: (user: User) => set({ user, error: null, isLoading: false }),
        setError: (error: string) => set({ error, isLoading: false }),
        initStore: async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const user = await getUser(token);
                    set({ user, isLoading: false });
                    return <Navigate to="/" />;
                }
            } catch (error) {
                if (typeof error === "string") set({ error });
            } finally {
                set({ isLoading: false });
            }
        },
    };
});
