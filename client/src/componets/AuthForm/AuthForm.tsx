import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "../../libs/utils";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type AuthFormDataSchemaType = z.infer<typeof schema>;

type AuthFormProps = {
  onSubmit: (data: z.infer<typeof schema>) => void;
  buttonText: string;
};

export const AuthForm = ({ onSubmit, buttonText }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
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

      <button type="submit" className="btn btn-primary w-full">
        {buttonText}
      </button>
    </form>
  );
};
