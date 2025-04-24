import { AuthForm, AuthFormDataSchemaType } from "../../componets/AuthForm";

export const LoginPage = () => {
  const handleLogin = (data: AuthFormDataSchemaType) => {
    console.log("login", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm onSubmit={handleLogin} buttonText="Login" />
    </div>
  );
};
