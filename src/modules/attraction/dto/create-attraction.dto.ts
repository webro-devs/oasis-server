import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAttractionContentDto } from 'src/modules/attraction-content/dto';
import { AttractionEnum } from 'src/infra/shared/enum';
import { AttractionType } from 'src/infra/shared/type';
class CreateAttractionDto {
  @ApiProperty({
    description: `type`,
    example: AttractionEnum.Attraction,
  })
  @IsNotEmpty()
  @IsString()
  readonly type: AttractionType;

  @ApiProperty({
    description: `photo`,
    example: 'url',
  })
  @IsOptional()
  @IsString()
  readonly photo: string;

  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        region: '',
        description: '',
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
        region: '',
        description: '',
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
  readonly contents: CreateAttractionContentDto[];

  @ApiProperty({
    description: `descImages`,
    example: ['',''],
  })
  @IsOptional()
  @IsArray()
  readonly descImages: string[]
}

export default CreateAttractionDto;
