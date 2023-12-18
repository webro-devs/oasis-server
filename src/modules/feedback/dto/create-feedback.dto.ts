import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateFeedbackDto {
  @ApiProperty({
    description: `description`,
    example: '...',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: `link`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly link: string;
}

export default CreateFeedbackDto;
