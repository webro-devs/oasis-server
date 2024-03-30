import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateGalleryDto {
  @ApiProperty({
    description: `title`,
    example: '#ru',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: `shortTitle`,
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  readonly shortTitle: string;

  @ApiProperty({
    description: `images`,
    example: ['',''],
  })
  @IsNotEmpty()
  @IsString()
  readonly images: string[]
}

export default CreateGalleryDto;
