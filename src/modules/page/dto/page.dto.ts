import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class PageDto {
  @ApiProperty({
    description: `currentPage`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  readonly currentPage: string;

  @ApiProperty({
    description: `addedPage`,
    example: 'url',
  })
  @IsNotEmpty()
  @IsString()
  readonly addedPage: string;
}

export default PageDto;
