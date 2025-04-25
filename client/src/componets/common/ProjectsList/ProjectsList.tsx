import { FC } from "react";

import { UseMutationResult } from "@tanstack/react-query";

import { RefreshIcon, TrashIcon } from "@/componets/icons";
import { Project } from "@/api/projects.ts";
import { ProjectCard } from "@/componets/common/ProjectCard";
import { Spinner } from "@/componets/common/Spinner";

type Props = {
  projects: Project[];
  refreshMutation: UseMutationResult<any, Error, string, unknown>;
  deleteMutation: UseMutationResult<any, Error, string, unknown>;
};

export const ProjectsList: FC<Props> = ({ projects, refreshMutation, deleteMutation }) => {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-md opacity-60 tracking-wide">Your GitHub Projects</li>

      {projects.length === 0 ? (
        <li className="p-4">No projects found. Add your first project!</li>
      ) : (
        projects.map((project: Project) => (
          <li key={project.id} className="list-row">
            <ProjectCard project={project} />

            <button
              className="btn btn-square btn-ghost"
              onClick={() => refreshMutation.mutate(project.id)}
              disabled={refreshMutation.isPending}
            >
              {refreshMutation.isPending && refreshMutation.variables === project.id ? (
                <Spinner />
              ) : (
                <RefreshIcon />
              )}
            </button>

            <button
              className="btn btn-square btn-ghost text-error"
              onClick={() => deleteMutation.mutate(project.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && deleteMutation.variables === project.id ? (
                <Spinner />
              ) : (
                <TrashIcon />
              )}
            </button>
          </li>
        ))
      )}
    </ul>
  );
};
