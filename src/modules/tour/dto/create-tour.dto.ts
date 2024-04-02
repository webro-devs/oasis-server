import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTourContentDto } from 'src/modules/tour-content/dto';
import { CreateTourPriceDto } from 'src/modules/tour-price/dto';
import { CreateTourItineraryDto } from 'src/modules/tour-itinerary/dto';

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
  @IsArray()
  photoGallery: string[];

  @ApiProperty({
    description: `routes`,
    example: ['title','title'],
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
    description: `about`,
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
      }
    ],
  })
  @IsOptional()
  @IsArray()
  readonly about: CreateTourContentDto[];

  @ApiProperty({
    description: `itinerary`,
    example: [
      {
        days:[
          {
            langCode: 'uz',
            day:'1-kun',
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
            langCode: 'ru',
            day:'1-день',
            title: '',
            description: '',
            tags: [
              {
                id:'',
                title:''
              }
            ],
          }
        ]
      },
      {
        days:[
          {
            langCode: 'uz',
            day:'2-kun',
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
            langCode: 'ru',
            day:'2-день',
            title: '',
            description: '',
            tags: [
              {
                id:'',
                title:''
              }
            ],
          }
        ]
      }
    ],
  })
  @IsOptional()
  @IsArray()
  readonly itinerary: CreateTourItineraryDto[];

  @ApiProperty({
    description: `specification`,
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
      }
    ],
  })
  @IsOptional()
  @IsArray()
  readonly specification: CreateTourContentDto[];

  @ApiProperty({
    description: `book`,
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
      }
    ],
  })
  @IsOptional()
  @IsArray()
  readonly book: CreateTourContentDto[];

  @ApiProperty({
    description: `name`,
    example: [
      {
        langCode: '',
        title: '',
      }
    ],
  })
  @IsOptional()
  @IsArray()
  readonly name: CreateTourContentDto[];

  @ApiProperty({
    description: `descImages`,
    example: ['',''],
  })
  @IsOptional()
  @IsArray()
  readonly descImages: string[]
}

export default CreateTourDto;
