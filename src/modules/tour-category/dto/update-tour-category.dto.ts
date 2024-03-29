import {  IsOptional, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdatePageContentDto } from 'src/modules/page-content/dto'
class UpdateTourCategoryDto {
  @ApiProperty({
    description: `photo`,
    example: 'url',
  })
  @IsOptional()
  @IsString()
  photo: string;

  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        shortTitle:'',
        shortDescription: '',
        description: '',
        descriptionPage: '',
        tags: [{
          id:'',
          title:''
        }],
      },
      {
        id:"uuid",
        langCode: '',
        title: '',
        shortTitle:'',
        shortDescription: '',
        description: '',
        descriptionPage: '',
        tags: [{
          id:'',
          title:''
        }],
      },
    ],
  })
  @IsOptional()
  @IsArray()
  readonly contents: UpdatePageContentDto[]
}
export default UpdateTourCategoryDto;
