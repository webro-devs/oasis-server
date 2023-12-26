import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTourContentDto } from 'src/modules/tour-content/dto';

class CreateTourDto {
  @ApiProperty({
    description: `tourCategory`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  tourCategory: string;

  @ApiProperty({
    description: `photoGallery`,
    example: ['url','url'],
  })
  @IsOptional()
  @IsString()
  photoGallery: string[];

  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: ['uuid', 'uuid'],
      }
    ],
  })
  @IsOptional()
  @IsArray()
  readonly about: CreateTourContentDto[];

  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: ['uuid', 'uuid'],
      }
    ],
  })
  @IsOptional()
  @IsArray()
  readonly itinerary: CreateTourContentDto[];

  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: ['uuid', 'uuid'],
      }
    ],
  })
  @IsOptional()
  @IsArray()
  readonly specification: CreateTourContentDto[];

  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: ['uuid', 'uuid'],
      }
    ],
  })
  @IsOptional()
  @IsArray()
  readonly book: CreateTourContentDto[];
}

export default CreateTourDto;
