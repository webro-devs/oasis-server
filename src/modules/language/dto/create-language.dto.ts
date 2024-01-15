import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateLanguageDto {
  @ApiProperty({
    description: `key`,
    example: 'uz',
  })
  @IsNotEmpty()
  @IsString()
  readonly key: string;

  @ApiProperty({
    description: `title`,
    example: 'Uzbek',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: `photo`,
    example: 'url',
  })
  @IsOptional()
  @IsString()
  readonly photo: string;
}

export default CreateLanguageDto;
