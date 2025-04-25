import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { login, LoginPayload } from "../../api/auth.ts";
import {
  AuthForm,
  AuthFormDataSchemaType,
} from "../../componets/auth/AuthForm";
import { AuthHero } from "../../componets/auth/AuthHero";
import { AuthLink } from "../../componets/auth/AuthLink/AuthLink.tsx";
import { ErrorMessage } from "../../componets/auth/ErrorMessage";
import { StorageKeys, StorageService } from "../../libs/storageService.ts";
import { Routes } from "../../route/routes.ts";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: LoginPayload) => login(data),
    onSuccess: (data) => {
      StorageService.setItem(StorageKeys.token, data.accessToken);
      navigate(Routes.PROJECTS, { replace: true });
    },
  });

  const handleLogin = (data: AuthFormDataSchemaType) => {
    mutate(data);
  };

  return (
    <AuthHero
      title="Welcome back!"
      description="Login to your account to access your projects."
    >
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <AuthForm
            onSubmit={handleLogin}
            buttonText="Login"
            isLoading={isPending}
          />

          {error && (
            <ErrorMessage>Invalid credentials. Please try again.</ErrorMessage>
          )}

          <AuthLink
            to={Routes.REGISTER}
            label="Register here"
            title="Don't have an account?"
          />
        </div>
      </div>
    </AuthHero>
  );
};
