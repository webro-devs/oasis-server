import { IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateStaticDto {
  @ApiProperty({
    description: `key`,
    example: 'uz',
  })
  @IsOptional()
  @IsString()
  readonly key: string;

  @ApiProperty({
    description: `value`,
    example: {
      uz:'',
      en:'',
      ru:''
    },
  })
  @IsOptional()
  @IsObject()
  readonly value: any;
}
export default UpdateStaticDto;
