import React, { useState } from "react";
import { useUserStore } from "../store/useUserStore";

export interface FormType {
    email: string;
    password: string;
}

interface FormProps {
    onSubmit: (user: FormType) => Promise<void>;
}

const Form = ({ onSubmit }: FormProps) => {
    const { error } = useUserStore();
    const [form, setform] = useState<FormType>({ email: "", password: "" });
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setform((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(form);
            }}
        >
            <label>
                Email
                <input
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                />
            </label>
            {error && <p>{error}</p>}
            {/* {<p>{isLoading ? "Loading..." : "Registered"}</p>} */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
