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

  @ApiProperty({
    description: `name`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly name: string;
}

export default CreateFeedbackDto;
