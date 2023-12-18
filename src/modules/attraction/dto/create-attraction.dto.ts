import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAttractionContentDto } from 'src/modules/attraction-content/dto';
import { AttractionEnum } from 'src/infra/shared/enum';
class CreateAttractionDto {
  @ApiProperty({
    description: `type`,
    example: AttractionEnum.Attraction,
  })
  @IsNotEmpty()
  @IsString()
  readonly type: string;

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
        description: '',
        tags: ['uuid', 'uuid'],
      },
      {
        langCode: '',
        title: '',
        description: '',
        tags: ['uuid', 'uuid'],
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  readonly contents: CreateAttractionContentDto[];
}

export default CreateAttractionDto;
