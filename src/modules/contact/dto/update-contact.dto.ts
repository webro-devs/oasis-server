import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateContactDto {
  @ApiProperty({
    description: `address`,
    example: '',
  })
  @IsOptional()
  @IsString()
  address:string

  @ApiProperty({
    description: `email`,
    example: '',
  })
  @IsOptional()
  @IsString()
  email:string

  @ApiProperty({
    description: `phone`,
    example: '',
  })
  @IsOptional()
  @IsString()
  phone:string

  @ApiProperty({
    description: `website`,
    example: 'url',
  })
  @IsOptional()
  @IsString()
  website:string

  @ApiProperty({
    description: `workingDays`,
    example: '',
  })
  @IsOptional()
  @IsString()
  workingDays:string

  @ApiProperty({
    description: `workingHours`,
    example: '',
  })
  @IsOptional()
  @IsString()
  workingHours:string

  @ApiProperty({
    description: `langCode`,
    example: 'uz',
  })
  @IsOptional()
  @IsString()
  langCode:string
}
export default UpdateContactDto;
