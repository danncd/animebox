import { useAuthModal } from "@/contexts/AuthModalContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthForm = () => {

    const { formType } = useAuthModal();

    return formType === "login" ? <LoginForm /> : <RegisterForm />;
};

export default AuthForm;