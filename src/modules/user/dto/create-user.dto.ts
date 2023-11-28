import { IsNotEmpty, IsString, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateUserDto {
  @ApiProperty({
    description: `login`,
    example: "admin",
  })
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @ApiProperty({
    description: `password`,
    example: "12345",
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export default CreateUserDto;
