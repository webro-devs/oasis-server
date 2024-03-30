import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateGalleryDto {
  @ApiProperty({
    description: `title`,
    example: '#ru',
  })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: `shortTitle`,
    example: '',
  })
  @IsOptional()
  @IsString()
  readonly shortTitle: string;

  @ApiProperty({
    description: `images`,
    example: ['',''],
  })
  @IsOptional()
  @IsString()
  readonly images: string[]
}
export default UpdateGalleryDto;
