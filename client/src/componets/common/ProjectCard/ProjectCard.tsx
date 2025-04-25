import { FC, PropsWithChildren } from "react";
import { Project } from "@/api/projects.ts";

type Props = {
  project: Project;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

const ProjectCardField: FC<
  PropsWithChildren & {
    title: string;
  }
> = ({ children, title }) => {
  return (
    <p>
      <span className="font-semibold">{title}:</span> {children}
    </p>
  );
};

export const ProjectCard: FC<Props> = ({ project }) => {
  return (
    <>
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
        <ProjectCardField title="URL">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary"
          >
            {project.url}
          </a>
        </ProjectCardField>

        <ProjectCardField title="Stars">{project.stars}</ProjectCardField>
        <ProjectCardField title="Forks">{project.forks}</ProjectCardField>
        <ProjectCardField title="Issues">{project.issues}</ProjectCardField>
        <ProjectCardField title="Added">{formatDate(project.addedAt)}</ProjectCardField>
      </div>
    </>
  );
};
