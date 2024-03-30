import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdatePartnerDto {
  @ApiProperty({
    description: `link`,
    example: '',
  })
  @IsOptional()
  @IsString()
  readonly link: string;

  @ApiProperty({
    description: `logo`,
    example: '',
  })
  @IsOptional()
  @IsString()
  readonly logo: string;
}
export default UpdatePartnerDto;
