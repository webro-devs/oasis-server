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
        description: '',
        tags: ['uuid', 'uuid'],
      },
      {
        id:'uuid',
        langCode: '',
        title: '',
        description: '',
        tags: ['uuid', 'uuid'],
      },
    ],
  })
  @IsOptional()
  @IsArray()
  readonly contents: UpdateAttractionContentDto[];
}

export default UpdateAttractionDto;
