import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateGalleryContentDto } from 'src/modules/gallery-content/dto';
class CreateGalleryDto {
  @ApiProperty({
    description: `images`,
    example: ['',''],
  })
  @IsNotEmpty()
  @IsArray()
  readonly images: string[];

  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        shortTitle: '',
      },
      {
        langCode: '',
        title: '',
        shortTitle: '',
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  readonly contents: CreateGalleryContentDto[];
}

export default CreateGalleryDto;
