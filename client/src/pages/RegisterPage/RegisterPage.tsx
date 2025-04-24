import { AuthForm, AuthFormDataSchemaType } from "../../componets/AuthForm";

export const RegisterPage = () => {
  const handleRegister = (data: AuthFormDataSchemaType) => {
    console.log("register", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm onSubmit={handleRegister} buttonText="Register" />
    </div>
  );
};
