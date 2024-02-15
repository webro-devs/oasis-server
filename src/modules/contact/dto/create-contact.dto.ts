import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateContactDto {
  @ApiProperty({
    description: `address`,
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  address:string

  @ApiProperty({
    description: `email`,
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  email:string

  @ApiProperty({
    description: `phone`,
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  phone:string

  @ApiProperty({
    description: `website`,
    example: 'url',
  })
  @IsNotEmpty()
  @IsString()
  website:string

  @ApiProperty({
    description: `workingDays`,
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  workingDays:string

  @ApiProperty({
    description: `workingHours`,
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  workingHours:string

  @ApiProperty({
    description: `langCode`,
    example: 'uz',
  })
  @IsNotEmpty()
  @IsString()
  langCode:string
}

export default CreateContactDto;
