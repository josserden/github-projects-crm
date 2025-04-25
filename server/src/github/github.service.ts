import { lastValueFrom } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface GithubRepositoryData {
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: number;
}

@Injectable()
export class GithubService {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = configService.get<string>(
      'GITHUB_API_URL',
      'https://api.github.com',
    );
  }

  async getRepositoryData(repoPath: string): Promise<GithubRepositoryData> {
    if (!repoPath || !repoPath.includes('/')) {
      throw new NotFoundException(
        `Invalid repository path: ${repoPath}. Format should be "owner/repo".`,
      );
    }

    const [owner, name] = repoPath.split('/');

    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.baseUrl}/repos/${owner}/${name}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'github-projects-crm',
          },
        }),
      );

      const { data } = response;

      return {
        owner,
        name,
        url: data.html_url,
        stars: data.stargazers_count,
        forks: data.forks_count,
        issues: data.open_issues_count,
        createdAt: Math.floor(new Date(data.created_at).getTime() / 1000),
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Repository not found: ${repoPath}`);
      }
      throw error;
    }
  }
}
