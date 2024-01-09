import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class TagTagDto {
  @ApiProperty({
    description: `id`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: `tagId`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  readonly tagId: string;
}

export default TagTagDto;
