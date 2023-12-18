import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdatePageContentDto {
  @ApiProperty({
    description: `id`,
    example: 'uuid',
  })
  @IsOptional()
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: `title`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: `short title`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly shortTitle: string;

  @ApiProperty({
    description: `description`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: `description page`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly descriptionPage: string;

  @ApiProperty({
    description: `langCode`,
    example: '...',
  })
  @IsOptional()
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
export default UpdatePageContentDto;
