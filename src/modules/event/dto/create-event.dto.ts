import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import CreateEventContentDto from 'src/modules/event-content/dto/create-event-content.dto';
class CreateEventDto {
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
    ],
  })
  @IsNotEmpty()
  @IsArray()
  readonly contents: CreateEventContentDto[];

  @ApiProperty({
    description: `photo`,
    example: 'url',
  })
  @IsOptional()
  @IsString()
  readonly photo: string;

  @ApiProperty({
    description: `descImages`,
    example: ['',''],
  })
  @IsOptional()
  @IsArray()
  readonly descImages: string[]
}

export default CreateEventDto;
