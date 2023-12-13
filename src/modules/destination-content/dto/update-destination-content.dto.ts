import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateDestinationContentDto {
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
    description: `title`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: `title`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly descriptionPage: string;

  @ApiProperty({
    description: `title`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly langCode: string;

  @ApiProperty({
    description: `tags`,
    example: ['uuid','uuid','uuid'],
  })
  @IsOptional()
  @IsArray()
  readonly tags: string[];
}
export default UpdateDestinationContentDto;
