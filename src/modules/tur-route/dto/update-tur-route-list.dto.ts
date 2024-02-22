import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import UpdateTourRouteDto from './update-tur-route.dto';

class UpdateTourRouteListDto {
  @ApiProperty({
    description: `contenst`,
    isArray: true,
    example: [
      {
        id:'',
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
  contents: UpdateTourRouteDto[];
}

export default UpdateTourRouteListDto;
