import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { useNavigate } from "react-router";

import { deleteProject, getProjects, refreshProject } from "@/api/projects";
import { AddProjectForm } from "@/componets/form/AddProjectForm";
import { StorageKeys, StorageService } from "@/libs/storageService";

type Project = {
  id: string;
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  addedAt: string;
  updatedAt: string;
};

export const ProjectsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAddingProject, setIsAddingProject] = useState(false);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const refreshMutation = useMutation({
    mutationFn: refreshProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleLogout = () => {
    StorageService.removeItem(StorageKeys.token);
    navigate("/login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">GitHub Projects</h1>
        <button onClick={handleLogout} className="btn btn-outline">
          Logout
        </button>
      </div>

      <div className="mb-6">
        <div
          className={`collapse bg-base-100 border-base-300 border ${
            isAddingProject ? "collapse-open" : ""
          }`}
        >
          <div
            className="collapse-title font-semibold cursor-pointer"
            onClick={() => setIsAddingProject(!isAddingProject)}
          >
            Add New GitHub Project
          </div>
          <div className="collapse-content">
            <AddProjectForm
              onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: ["projects"] });
                setIsAddingProject(false);
              }}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Your GitHub Projects</li>

          {projects.length === 0 ? (
            <li className="p-4">No projects found. Add your first project!</li>
          ) : (
            projects.map((project: Project) => (
              <li key={project.id} className="list-row">
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={`https://github.com/${project.owner}.png`}
                    alt={project.owner}
                  />
                </div>
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">{project.owner}</div>
                </div>
                <div className="list-col-wrap text-xs space-y-1">
                  <p>
                    <span className="font-semibold">URL:</span>{" "}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary"
                    >
                      {project.url}
                    </a>
                  </p>

                  <p>
                    <span className="font-semibold">Stars:</span> {project.stars}
                  </p>
                  <p>
                    <span className="font-semibold">Forks:</span> {project.forks}
                  </p>
                  <p>
                    <span className="font-semibold">Issues:</span> {project.issues}
                  </p>
                  <p>
                    <span className="font-semibold">Added:</span> {formatDate(project.addedAt)}
                  </p>
                </div>

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
                    <span className="loading loading-spinner loading-sm"></span>
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
      )}
    </div>
  );
};
