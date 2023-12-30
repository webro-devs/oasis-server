import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTourContentDto } from 'src/modules/tour-content/dto';
import { CreateTourPriceDto } from 'src/modules/tour-price/dto';

class CreateTourDto {
  @ApiProperty({
    description: `tourCategory`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  tourCategory: string;

  @ApiProperty({
    description: `destination`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  destination: string;

  @ApiProperty({
    description: `photoGallery`,
    example: ['url','url'],
  })
  @IsOptional()
  @IsArray()
  photoGallery: string[];

  @ApiProperty({
    description: `routes`,
    example: ['uuid','uuid'],
  })
  @IsOptional()
  @IsArray()
  routes: string[];

  @ApiProperty({
    description: `price`,
    example: [
      {
        person: [
          { langCode: 'en', person: '1 person' },
          { langCode: 'uz', person: '1 odam' },
        ],
        econome: '220$',
        comfort: '220$',
        deluxe: '220$',
      },
      {
        person: [
          { langCode: 'en', person: '2 person' },
          { langCode: 'uz', person: '2 odam' },
        ],
        econome: '420$',
        comfort: '420$',
        deluxe: '420$',
      },
    ]
  })
  @IsOptional()
  @IsArray()
  readonly price: CreateTourPriceDto[];

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
