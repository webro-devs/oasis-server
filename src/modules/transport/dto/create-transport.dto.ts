import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePageContentDto } from 'src/modules/page-content/dto';
import { CreateRoadTransportDto } from 'src/modules/road-transport/dto';
import { TransportType } from 'src/infra/shared/type';
import { TransportEnum } from 'src/infra/shared/enum';

class CreateTransportDto {
  @ApiProperty({
    description: `type`,
    example: TransportEnum.Transfer,
  })
  @IsNotEmpty()
  @IsString()
  type: TransportType;

  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        shortTitle: '',
        shortDescription: '',
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
        langCode: '',
        title: '',
        shortTitle: '',
        shortDescription: '',
        description: '',
        descriptionPage: '',
        tags: [
          {
            id:'',
            title:''
          }
        ],
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  readonly contents: CreatePageContentDto[];

  @ApiProperty({
    description: `roadTransports`,
    example: [
      {
        type: [
          { langCode: 'uz', type: 'van' },
          { langCode: 'ru', type: 'ван' },
        ],
        seat: '5',
        bag: '10',
        photo: 'https://url',
      },
      {
        type: [
          { langCode: 'uz', type: 'van' },
          { langCode: 'ru', type: 'ван' },
        ],
        seat: '5',
        bag: '10',
        photo: 'https://url',
      },
    ],
    required: false,
  })
  @IsOptional()
  @IsArray()
  roadTransports: CreateRoadTransportDto[];

  @ApiProperty({
    description: `descImages`,
    example: ['',''],
  })
  @IsOptional()
  @IsArray()
  readonly descImages: string[]

  @ApiProperty({
    description: `destination`,
    example: 'uuid',
  })
  @IsOptional()
  @IsString()
  readonly destination: string
}

export default CreateTransportDto;
