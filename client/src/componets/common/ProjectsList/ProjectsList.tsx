import { FC } from "react";

import { Project } from "@/api/projects.ts";
import { ProjectCard } from "@/componets/common/ProjectCard";
import { UseMutationResult } from "@tanstack/react-query";

type Props = {
  projects: Project[];
  refreshMutation: UseMutationResult<any, Error, string, unknown>;
  deleteMutation: UseMutationResult<any, Error, string, unknown>;
};

export const ProjectsList: FC<Props> = ({ projects, refreshMutation, deleteMutation }) => {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Your GitHub Projects</li>

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
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M21 12a9 9 0 0 1-9 9c-4.97 0-9-4.03-9-9s4.03-9 9-9h.09"></path>
                    <path d="M13 5V3"></path>
                    <path d="M19 12.07V7h-5.07"></path>
                  </g>
                </svg>
              )}
            </button>

            <button
              className="btn btn-square btn-ghost text-error"
              onClick={() => deleteMutation.mutate(project.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && deleteMutation.variables === project.id ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <path d="M10 11v6"></path>
                    <path d="M14 11v6"></path>
                  </g>
                </svg>
              )}
            </button>
          </li>
        ))
      )}
    </ul>
  );
};
