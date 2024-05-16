import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateTourContentDto } from 'src/modules/tour-content/dto';
import { UpdateTourPriceDto } from 'src/modules/tour-price/dto';
import { TourRoute } from 'src/modules/tour-route/tour-route.entity';
import { UpdateTourItineraryDto } from 'src/modules/tour-itinerary/dto';

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
  @IsArray()
  photoGallery: string[];

  @ApiProperty({
    description: `descImages`,
    example: ['',''],
  })
  @IsOptional()
  @IsArray()
  readonly descImages: string[]

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
    description: `itinerary`,
    example: [
      {
        id:'uuid',
        days:[
          {
            id:'',
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
  readonly itinerary: UpdateTourItineraryDto[];
}

export default UpdateTourDto;
