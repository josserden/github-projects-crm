import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entities';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { GithubService } from '../github/github.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private githubService: GithubService,
  ) {}

  async findAll(user: User): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { user: { id: user.id } },
      order: { addedAt: 'DESC' },
    });
  }

  async findOne(id: string, user: User): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    return project;
  }

  async create(
    createProjectDto: CreateProjectDto,
    user: User,
  ): Promise<Project> {
    const [owner, name] = createProjectDto.repoPath.split('/');
    const existingProject = await this.projectsRepository.findOne({
      where: { owner, name, user: { id: user.id } },
    });

    if (existingProject) {
      throw new ConflictException(
        `Project with repository "${createProjectDto.repoPath}" already exists`,
      );
    }

    const repoData = await this.githubService.getRepositoryData(
      createProjectDto.repoPath,
    );

    const project = this.projectsRepository.create({
      owner: repoData.owner,
      name: repoData.name,
      url: repoData.url,
      stars: repoData.stars,
      forks: repoData.forks,
      issues: repoData.issues,
      user,
    });

    return this.projectsRepository.save(project);
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    user: User,
  ): Promise<Project> {
    const project = await this.findOne(id, user);

    const repoData = await this.githubService.getRepositoryData(
      updateProjectDto?.repoPath ?? `${project.owner}/${project.name}`,
    );

    Object.assign(project, {
      owner: repoData.owner,
      name: repoData.name,
      url: repoData.url,
      stars: repoData.stars,
      forks: repoData.forks,
      issues: repoData.issues,
    });

    return this.projectsRepository.save(project);
  }

  async remove(id: string, user: User): Promise<void> {
    const project = await this.findOne(id, user);

    await this.projectsRepository.remove(project);
  }

  async refreshProject(id: string, user: User): Promise<Project> {
    const project = await this.findOne(id, user);

    const repoPath = `${project.owner}/${project.name}`;
    const repoData = await this.githubService.getRepositoryData(repoPath);

    Object.assign(project, {
      stars: repoData.stars,
      forks: repoData.forks,
      issues: repoData.issues,
      url: repoData.url,
    });

    return this.projectsRepository.save(project);
  }
}
