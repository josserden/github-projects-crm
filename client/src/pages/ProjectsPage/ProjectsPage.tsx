import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ProjectsList } from "@/componets/common/ProjectsList";
import { Loader } from "@/componets/common/Loader";
import { deleteProject, getProjects, refreshProject } from "@/api/projects";
import { AddProjectForm } from "@/componets/form/AddProjectForm";
import { isAuthenticated } from "@/libs/isAuthenticated.ts";

export const ProjectsPage = () => {
  const queryClient = useQueryClient();
  const [isAddingProject, setIsAddingProject] = useState(false);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    enabled: isAuthenticated(),
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

  return (
    <div className="container mx-auto py-8 px-4">
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
        <Loader />
      ) : (
        <ProjectsList
          projects={projects}
          refreshMutation={refreshMutation}
          deleteMutation={deleteMutation}
        />
      )}
    </div>
  );
};
