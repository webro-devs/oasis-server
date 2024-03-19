import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateFeedbackDto {
  @ApiProperty({
    description: `description`,
    example: '...',
  })
  @IsOptional()
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
    description: `isActive`,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive: boolean;

  @ApiProperty({
    description: `name`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly name: string;
}
export default UpdateFeedbackDto;
