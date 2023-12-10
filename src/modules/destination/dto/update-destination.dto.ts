import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateDestinationDto {
  // @ApiProperty({
  //   description: `title`,
  //   example: '...',
  // })
  // @IsOptional()
  // @IsString()
  // readonly title: string;
}
export default UpdateDestinationDto;
