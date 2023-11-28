import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleType } from '../../../infra/shared/type';
class UpdateUserDto {
  @ApiProperty({
    description: `Firstname`,
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    description: `Lastname`,
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    description: `login`,
    example: 'login',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly login: string;

  @ApiProperty({
    description: `password`,
    example: 'password',
  })
  @IsOptional()
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: `role`,
    example: 1,
  })
  @IsOptional()
  @IsString()
  readonly role: UserRoleType;

  @ApiProperty({
    description: `filial id`,
    example: 'uuid',
  })
  @IsOptional()
  @IsString()
  readonly filial: string;

  @ApiProperty({
    description: `email`,
    example: 'example@gmail.com',
  })
  @IsOptional()
  @IsString()
  readonly email: string;

  @ApiProperty({
    description: `phone`,
    example: '+1234567890',
  })
  @IsOptional()
  @IsString()
  readonly phone: string;

}

export default UpdateUserDto;
