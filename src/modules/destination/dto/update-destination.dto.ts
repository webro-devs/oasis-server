import {  IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateDestinationDto {
  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: ['uuid', 'uuid'],
      },
      {
        id:"uuid",
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: ['uuid', 'uuid'],
      },
    ],
  })
  @IsOptional()
  @IsArray()
  readonly contents
}
export default UpdateDestinationDto;
