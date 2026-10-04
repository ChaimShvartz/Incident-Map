import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const ProtectedRoute = () => {
    const { user, isLoading } = useUserStore();
    if (isLoading) return <p>Loading...</p>;
    return user ? <Outlet /> : <Navigate to="/register" />;
};

export default ProtectedRoute;
