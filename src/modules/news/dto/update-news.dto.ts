import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateNewsDto {
  @ApiProperty({
    description: `title`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly title: string;
}
export default UpdateNewsDto;