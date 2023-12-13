import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateDestinationContentDto {
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
  @IsNotEmpty()
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

export default CreateDestinationContentDto;
