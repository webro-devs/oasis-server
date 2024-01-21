import {  IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdatePageContentDto } from 'src/modules/page-content/dto';
class UpdateDestinationDto {
  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: [
          {
            id:'',
            title:''
          }
        ],
      },
      {
        id:"uuid",
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: [
          {
            id:'',
            title:''
          }
        ],
      },
    ],
  })
  @IsOptional()
  @IsArray()
  readonly contents: UpdatePageContentDto[]
}
export default UpdateDestinationDto;
