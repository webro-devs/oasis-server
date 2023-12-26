import {  IsOptional, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdatePageContentDto } from 'src/modules/page-content/dto'
class UpdateTourCategoryDto {
  @ApiProperty({
    description: `type`,
    example: 'cultural tour'
  })
  @IsOptional()
  @IsString()
  type:string

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
  readonly contents: UpdatePageContentDto[]
}
export default UpdateTourCategoryDto;
