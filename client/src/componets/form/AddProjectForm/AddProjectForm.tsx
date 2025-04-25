import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createProject } from "@/api/projects.ts";
import { ErrorMessage } from "@/componets/auth/ErrorMessage";
import { Spinner } from "@/componets/common/Spinner";
import { cn } from "@/libs/utils";

type AddProjectFormProps = {
  onSuccess: () => void;
};

const schema = z.object({
  repoPath: z
    .string()
    .min(1, "Repository path is required")
    .refine((val) => val.includes("/"), {
      message: "Invalid repository path. Format should be 'owner/repo'",
    }),
});

type FormData = z.infer<typeof schema>;

export const AddProjectForm = ({ onSuccess }: AddProjectFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError: setFormError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      repoPath: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      reset();
      onSuccess();
    },
    onError: (err: any) => {
      setFormError("repoPath", {
        type: "server",
        message: err.response?.data?.message || "Failed to add project",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutate({ repoPath: data.repoPath });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">GitHub Repository Path</span>
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. facebook/react"
            className={cn("input flex-1", errors.repoPath ? "input-error" : "input-bordered")}
            {...register("repoPath")}
          />
          <button type="submit" className="btn btn-primary text-white" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner />
                Adding...
              </>
            ) : (
              "Add Repository"
            )}
          </button>
        </div>

        {errors.repoPath && <ErrorMessage>{errors.repoPath.message}</ErrorMessage>}
      </div>

      <p className="text-sm opacity-70">
        Enter the repository path in the format: owner/repository (e.g. facebook/react)
      </p>
    </form>
  );
};
