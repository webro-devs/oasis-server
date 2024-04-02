import { IsOptional, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import UpdateEventContentDto from 'src/modules/event-content/dto/update-event-content.dto';
class UpdateEventDto {
  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        shortTitle: '',
        description: '',
        tags: [
          {
            id:'',
            title:''
          }
        ],
      },
      {
        id:'uuid',
        langCode: '',
        title: '',
        shortTitle: '',
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
  @IsOptional()
  @IsArray()
  readonly contents: UpdateEventContentDto[];

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
export default UpdateEventDto;
