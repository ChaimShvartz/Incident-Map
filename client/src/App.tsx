import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MapPage from "./pages/MapPage";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";

const App = () => {
    const { initStore } = useUserStore();
    useEffect(() => {
        initStore();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<MapPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
