import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { login, LoginPayload } from "../../api/auth.ts";
import { AuthForm, AuthFormDataSchemaType } from "../../componets/AuthForm";
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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Sign in to your account to manage your GitHub projects. Track stars,
            forks, and issues all in one place.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <AuthForm
              onSubmit={handleLogin}
              buttonText="Login"
              isLoading={isPending}
            />

            {error && (
              <div className="text-error text-sm mt-2">
                Invalid credentials. Please try again.
              </div>
            )}

            <div className="mt-4 text-center">
              Don't have an account?{" "}
              <Link to={Routes.REGISTER} className="link link-primary">
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
