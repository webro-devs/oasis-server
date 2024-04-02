import {  IsOptional, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdatePageContentDto } from 'src/modules/page-content/dto';
import { UpdateRoadTransportDto } from 'src/modules/road-transport/dto';
import { TransportType } from 'src/infra/shared/type';
import { TransportEnum } from 'src/infra/shared/enum';
class UpdateTransportDto {
  @ApiProperty({
    description: `type`,
    example: TransportEnum.Train
  })
  @IsOptional()
  @IsString()
  type:TransportType

  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        shortTitle:'',
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
        id:"uuid",
        langCode: '',
        title: '',
        shortTitle:'',
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
  @IsOptional()
  @IsArray()
  readonly contents: UpdatePageContentDto[]

  @ApiProperty({
    description: `roadTransports`,
    example: [
      {
        id:'uuid',
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
  readonly roadTransports: UpdateRoadTransportDto[];

  @ApiProperty({
    description: `descImages`,
    example: ['',''],
  })
  @IsOptional()
  @IsArray()
  readonly descImages: string[]
}
export default UpdateTransportDto;
