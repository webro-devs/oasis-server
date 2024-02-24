import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import CreateTourRouteDto from './create-tour-route.dto';

class CreateTourRouteListDto {
  @ApiProperty({
    description: `contents`,
    isArray: true,
    example: [
      {
        title: '',
        description: '',
        langCode: '',
      },
      {
        title: '',
        description: '',
        langCode: '',
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  contents: CreateTourRouteDto[];
}

export default CreateTourRouteListDto;
