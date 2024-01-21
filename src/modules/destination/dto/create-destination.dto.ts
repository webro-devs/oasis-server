import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePageContentDto } from 'src/modules/page-content/dto';
class CreateDestinationDto {
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

export default CreateDestinationDto;
