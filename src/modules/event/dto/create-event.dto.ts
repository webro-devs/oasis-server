import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import CreateEventContentDto from 'src/modules/event-content/dto/create-event-content.dto';
class CreateEventDto {
  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        shortTitle: '',
        description: '',
        tags: ['uuid', 'uuid'],
      },
      {
        langCode: '',
        title: '',
        shortTitle: '',
        description: '',
        tags: ['uuid', 'uuid'],
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  readonly contents: CreateEventContentDto[];
}

export default CreateEventDto;
