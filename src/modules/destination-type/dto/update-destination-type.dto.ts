import {  IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateDestinationTypeDto {
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
  readonly contents: any[];
}
export default UpdateDestinationTypeDto;
