import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateStaticDto {
  @ApiProperty({
    description: `key`,
    example: 'uz',
  })
  @IsOptional()
  @IsString()
  readonly key: string;

  @ApiProperty({
    description: `title`,
    example: 'English',
  })
  @IsOptional()
  @IsString()
  readonly title: string;
}
export default UpdateStaticDto;
