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
        tags: ['uuid', 'uuid'],
      },
      {
        id:'uuid',
        langCode: '',
        title: '',
        shortTitle: '',
        description: '',
        tags: ['uuid', 'uuid'],
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
}
export default UpdateEventDto;
