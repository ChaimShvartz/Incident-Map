import Form, { type FormType } from "../components/Form";
import { useUserStore } from "../store/useUserStore";
import { login } from "../services/userAuthServices";

const LoginPage = () => {
    const { setUser, setError } = useUserStore();
    const onSubmit = async (user: FormType) => {
        try {
            const resUser = await login(user);
            setUser(resUser);
        } catch (error: any) {
            if (Object.hasOwn(error, "message")) setError(error.message);
        }
    };
    return (
        <>
            <div>LoginPage</div>
            <Form onSubmit={onSubmit} />
        </>
    );
};

export default LoginPage;
