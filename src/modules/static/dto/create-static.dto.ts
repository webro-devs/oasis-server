import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateStaticDto {
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
}

export default CreateStaticDto;
