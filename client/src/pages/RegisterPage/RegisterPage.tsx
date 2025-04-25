import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router";

import { register } from "@/api/auth.ts";
import { AuthForm, AuthFormDataSchemaType } from "@/componets/auth/AuthForm";
import { AuthHero } from "@/componets/auth/AuthHero";
import { AuthLink } from "@/componets/auth/AuthLink/AuthLink.tsx";
import { ErrorMessage } from "@/componets/auth/ErrorMessage";
import { Routes } from "@/route/routes.ts";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: AuthFormDataSchemaType) => register(data),
    onSuccess: () => {
      navigate(Routes.PROJECTS, { replace: true });
    },
  });

  const handleRegister = (data: AuthFormDataSchemaType) => {
    mutate(data);
  };

  return (
    <AuthHero
      title="Register now!"
      description="Create an account to start tracking your favorite GitHub projects. It's quick and easy!"
    >
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <AuthForm onSubmit={handleRegister} buttonText="Register" isLoading={isPending} />

          {error && <ErrorMessage>Registration failed. Please try again.</ErrorMessage>}

          <AuthLink to={Routes.LOGIN} label="Login here" title="Already have an account?" />
        </div>
      </div>
    </AuthHero>
  );
};
