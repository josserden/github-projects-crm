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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm mx-auto"
    >
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className={cn(
            "input input-bordered w-full",
            errors.email && "input-error",
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          {...register("password")}
          className={cn(
            "input input-bordered w-full",
            errors.password && "input-error",
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-full text-white">
        {isLoading && (
          <span className="loading loading-spinner loading-sm ml-1" />
        )}
        {buttonText}
      </button>
    </form>
  );
};
