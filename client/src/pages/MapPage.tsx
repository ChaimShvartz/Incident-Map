import { useUserStore } from "../store/useUserStore";
import type { User } from "../types/User";

const MapPage = () => {
    const user = useUserStore((state) => state.user) as User;
    return (
        <>
            <div>MapPage</div>
            <div>{user.email}</div>
        </>
    );
};

export default MapPage;
