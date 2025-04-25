import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "../../libs/utils";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type AuthFormDataSchemaType = z.infer<typeof schema>;

interface AuthFormProps {
  onSubmit: (data: z.infer<typeof schema>) => void;
  buttonText: string;
  isLoading?: boolean;
}

const defaultValues = {
  email: "user@example.com",
  password: "Password123!",
};

export const AuthForm: FC<AuthFormProps> = ({
  onSubmit,
  buttonText,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset">
        <label className="label">Email</label>
        <input
          type="email"
          className={cn(
            "input input-bordered w-full",
            errors.email && "input-error",
          )}
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <div className="text-error text-sm mt-1">{errors.email.message}</div>
        )}

        <label className="label">Password</label>
        <input
          type="password"
          className={cn(
            "input input-bordered w-full",
            errors.password && "input-error",
          )}
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <div className="text-error text-sm mt-1">
            {errors.password.message}
          </div>
        )}

        <div className="mt-2">
          <a className="link link-hover text-sm">Forgot password?</a>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={isLoading}
        >
          {isLoading && (
            <span className="loading loading-spinner loading-sm mr-2" />
          )}
          {buttonText}
        </button>
      </fieldset>
    </form>
  );
};
