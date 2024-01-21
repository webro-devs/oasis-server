import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateAttractionContentDto } from 'src/modules/attraction-content/dto';
class UpdateAttractionDto {
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
        id:'uuid',
        langCode: '',
        region: '',
        title: '',
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
  @IsOptional()
  @IsArray()
  readonly contents: UpdateAttractionContentDto[];
}

export default UpdateAttractionDto;
