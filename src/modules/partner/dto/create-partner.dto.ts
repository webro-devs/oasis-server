import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreatePartnerDto {
  @ApiProperty({
    description: `link`,
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  readonly link: string;

  @ApiProperty({
    description: `logo`,
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  readonly logo: string;
}

export default CreatePartnerDto;
