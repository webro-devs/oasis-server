import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateBookTourDto {
  @ApiProperty({
    description: `title`,
    example: '#uz',
  })
  @IsOptional()
  @IsString()
  readonly title: string;
}
export default UpdateBookTourDto;
