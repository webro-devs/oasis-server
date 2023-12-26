import { IsArray, IsNotEmpty, IsString } from 'class-validator';
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
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        shortTitle: '',
        description: '',
        descriptionPage: '',
        tags: ['uuid', 'uuid'],
      },
      {
        langCode: '',
        title: '',
        shortTitle: '',
        description: '',
        descriptionPage: '',
        tags: ['uuid', 'uuid'],
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  readonly contents: CreatePageContentDto[];
}

export default CreateTourCategoryDto;
