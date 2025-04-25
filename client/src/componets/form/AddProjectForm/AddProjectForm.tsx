import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createProject } from "../../../api/projects.ts";

type AddProjectFormProps = {
  onSuccess: () => void;
};

export const AddProjectForm = ({ onSuccess }: AddProjectFormProps) => {
  const [repoPath, setRepoPath] = useState("");
  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      setRepoPath("");
      setError("");
      onSuccess();
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Failed to add project");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!repoPath.trim()) {
      setError("Repository path is required");
      return;
    }

    if (!repoPath.includes("/")) {
      setError("Invalid repository path. Format should be 'owner/repo'");
      return;
    }

    mutate({ repoPath });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">GitHub Repository Path</span>
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. facebook/react"
            className="input input-bordered flex-1"
            value={repoPath}
            onChange={(e) => setRepoPath(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Adding...
              </>
            ) : (
              "Add Repository"
            )}
          </button>
        </div>

        {error && <div className="text-error text-sm mt-1">{error}</div>}
      </div>

      <div className="text-sm opacity-70">
        Enter the repository path in the format: owner/repository (e.g.
        facebook/react)
      </div>
    </form>
  );
};
