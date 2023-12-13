import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDestinationContentDto } from 'src/modules/destination-content/dto';
class CreateDestinationDto {
  @ApiProperty({
    description: `contents`,
    example: [
      {
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: ['uuid', 'uuid'],
      },
      {
        langCode: '',
        title: '',
        description: '',
        descriptionPage: '',
        tags: ['uuid', 'uuid'],
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  readonly contents: CreateDestinationContentDto[];
}

export default CreateDestinationDto;
