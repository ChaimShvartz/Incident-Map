import { useNavigate } from "react-router-dom";
import Form, { type FormType } from "../components/Form";
import { useUserStore } from "../store/useUserStore";
import { register } from "../services/userAuthServices";

const RegisterPage = () => {
    const navigate = useNavigate()
    const { setUser, setError } = useUserStore();
    const onSubmit = async (user: FormType) => {
        try {
            const resUser = await register(user);
            setUser(resUser);
            navigate('/')
        } catch (error: any) {
            if (Object.hasOwn(error, "message")) setError(error.message);
        }
    };
    return (
        <>
            <div>RegisterPage</div>
            <Form onSubmit={onSubmit} />
        </>
    );
};

export default RegisterPage;
