import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateBookTourto {
  @ApiProperty({
    description: `name`,
    example: '',
  })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: `email`,
    example: '',
  })
  @IsOptional()
  @IsString()
  readonly email: string;

  @ApiProperty({
    description: `startDate`,
    example: '',
  })
  @IsOptional()
  @IsString()
  readonly startDate: string;

  @ApiProperty({
    description: `flightDetail`,
    example: '',
  })
  @IsOptional()
  @IsString()
  readonly flightDetail: string;

  @ApiProperty({
    description: `count`,
    example: '',
  })
  @IsOptional()
  @IsString()
  readonly count: string;

  @ApiProperty({
    description: `roomType`,
    example: '',
  })
  @IsOptional()
  @IsString()
  readonly roomType: string;

  @ApiProperty({
    description: `description`,
    example: '',
  })
  @IsOptional()
  @IsString()
  readonly description: string;
}

export default CreateBookTourto;
