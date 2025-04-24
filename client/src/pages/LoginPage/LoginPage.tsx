import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login, LoginPayload } from "../../api/auth.ts";
import { AuthForm, AuthFormDataSchemaType } from "../../componets/AuthForm";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: LoginPayload) => login(data),
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      navigate("/projects");
    },
  });

  const handleLogin = (data: AuthFormDataSchemaType) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm
        onSubmit={handleLogin}
        buttonText="Login"
        isLoading={isPending}
      />
    </div>
  );
};
