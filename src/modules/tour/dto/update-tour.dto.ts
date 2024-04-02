import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateTourContentDto } from 'src/modules/tour-content/dto';
import { UpdateTourPriceDto } from 'src/modules/tour-price/dto';
import { TourRoute } from 'src/modules/tour-route/tour-route.entity';

class UpdateTourDto {
  @ApiProperty({
    description: `tourCategory`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  tourCategory: string;

  @ApiProperty({
    description: `routes`,
    example: {
      photo:'url',
      photoGallery: ['url','url'],
      routes: ['title','title'],
      descImages: ['','']
    }
  })
  @IsOptional()
  @IsObject()
  tour: {routes:string[], photoGallery:string[], photo:string, descImages:string[]}

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

  @ApiProperty({
    description: `descImages`,
    example: ['',''],
  })
  @IsOptional()
  @IsArray()
  readonly descImages: string[]
}

export default UpdateTourDto;
