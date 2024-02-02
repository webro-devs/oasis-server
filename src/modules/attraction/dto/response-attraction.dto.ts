import { ApiProperty } from '@nestjs/swagger';

export class AttractionListResponseType {
  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly slug: string;

  @ApiProperty()
  readonly photo: string;

  @ApiProperty()
  readonly region: string;

  @ApiProperty()
  readonly title: string;
}

export class AttractionSingleResponseType {
  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly slug: string;

  @ApiProperty()
  readonly photo: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly region: string;

  @ApiProperty()
  readonly description: string;
}
