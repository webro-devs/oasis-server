import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePageContentDto } from 'src/modules/page-content/dto';

class CreateTourCategoryDto {
  @ApiProperty({
    description: `type`,
    example: 'cultural tour',
  })
  @IsNotEmpty()
  @IsString()
  type: string;

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
        shortTitle: '',
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
        langCode: '',
        title: '',
        shortTitle: '',
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
  @IsNotEmpty()
  @IsArray()
  readonly contents: CreatePageContentDto[];
}

export default CreateTourCategoryDto;
