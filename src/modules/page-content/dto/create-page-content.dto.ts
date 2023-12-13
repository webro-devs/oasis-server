import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreatePageContentDto {
  @ApiProperty({
    description: `title`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: `description`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: `langCode`,
    example: '...',
  })
  @IsNotEmpty()
  @IsString()
  readonly langCode: string;

  @ApiProperty({
    description: `tags`,
    example: ['uuid','uuid'],
  })
  @IsOptional()
  @IsArray()
  readonly tags: string[];
}

export default CreatePageContentDto;
