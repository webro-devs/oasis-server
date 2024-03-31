import { IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateGalleryContentDto } from 'src/modules/gallery-content/dto';
class UpdateGalleryDto {
  @ApiProperty({
    description: `images`,
    example: ['',''],
  })
  @IsOptional()
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
  @IsOptional()
  @IsArray()
  readonly contents: UpdateGalleryContentDto[];
}
export default UpdateGalleryDto;
