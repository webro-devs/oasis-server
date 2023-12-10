import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateDestinationDto {
  // @ApiProperty({
  //   description: `title`,
  //   example: '...',
  // })
  // @IsNotEmpty()
  // @IsString()
  // readonly title: string;
}

export default CreateDestinationDto;
