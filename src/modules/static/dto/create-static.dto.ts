import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
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
    description: `value`,
    example: {
      uz:'',
      en:'',
      ru:''
    },
  })
  @IsNotEmpty()
  @IsObject()
  readonly value: any;
}

export default CreateStaticDto;
