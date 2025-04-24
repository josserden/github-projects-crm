import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    example: 'facebook/react',
    description: 'GitHub repository path in format "owner/repo"',
  })
  @IsString()
  @IsNotEmpty({ message: 'Repository path is required' })
  repoPath: string;
}
