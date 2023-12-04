import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
}

export default CreatePageContentDto;
