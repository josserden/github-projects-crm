import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { register } from "../../api/auth.ts";
import { AuthForm, AuthFormDataSchemaType } from "../../componets/AuthForm";

import { Routes } from "../../route/routes.ts";

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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Create an account to start tracking your favorite GitHub projects.
            It's quick and easy!
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <AuthForm
              onSubmit={handleRegister}
              buttonText="Register"
              isLoading={isPending}
            />

            {error && (
              <div className="text-error text-sm mt-2">
                Registration failed. Please try again.
              </div>
            )}

            <div className="mt-4 text-center">
              Already have an account?{" "}
              <Link to={Routes.LOGIN} className="link link-primary">
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
