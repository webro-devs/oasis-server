import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateTourContentDto } from 'src/modules/tour-content/dto';
import { UpdateTourPriceDto } from 'src/modules/tour-price/dto';

class UpdateTourDto {
  @ApiProperty({
    description: `tourCategory`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  tourCategory: string;

  @ApiProperty({
    description: `photo`,
    example: 'url',
  })
  @IsOptional()
  @IsString()
  photo: string;

  @ApiProperty({
    description: `photoGallery`,
    example: ['url','url'],
  })
  @IsOptional()
  @IsString()
  photoGallery: string[];

  @ApiProperty({
    description: `routes`,
    example: [
      {
        id:'',
        title:''
      }
    ],
  })
  @IsOptional()
  @IsArray()
  routes: string[];

  @ApiProperty({
    description: `price`,
    example: [
      {
        id:'uuid',
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
  readonly price: UpdateTourPriceDto[];

  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: [
          {
            id:'',
            title:''
          }
        ],
      },
      {
        id:'',
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: [
          {
            id:'',
            title:''
          }
        ],
      }
    ],
  })
  @IsOptional()
  @IsArray()
  readonly about: UpdateTourContentDto[];

  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: [
          {
            id:'',
            title:''
          }
        ],
      },
      {
        id:'',
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: [
          {
            id:'',
            title:''
          }
        ],
      }
    ],
  })
  @IsOptional()
  @IsArray()
  readonly specification: UpdateTourContentDto[];

  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: [
          {
            id:'',
            title:''
          }
        ],
      },
      {
        id:'',
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: [
          {
            id:'',
            title:''
          }
        ],
      }
    ],
  })
  @IsOptional()
  @IsArray()
  readonly book: UpdateTourContentDto[];

  @ApiProperty({
    description: `name`,
    example: [
      {
        id:'',
        langCode: '',
        title: '',
      },
      {
        langCode: '',
        title: '',
      }
    ],
  })
  @IsOptional()
  @IsArray()
  readonly name: UpdateTourContentDto[];
}

export default UpdateTourDto;
