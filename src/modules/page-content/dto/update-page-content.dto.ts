import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdatePageContentDto {
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
  @IsOptional()
  @IsString()
  readonly langCode: string;
}
export default UpdatePageContentDto;
