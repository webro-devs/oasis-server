import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateLanguageDto {
  @ApiProperty({
    description: `key`,
    example: 'uz',
  })
  @IsOptional()
  @IsString()
  readonly key: string;

  @ApiProperty({
    description: `photo`,
    example: 'url',
  })
  @IsOptional()
  @IsString()
  readonly photo: string;
}
export default UpdateLanguageDto;
