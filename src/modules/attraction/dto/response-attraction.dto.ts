import { ApiProperty } from '@nestjs/swagger';
import { PageResponseTypeDto } from 'src/infra/shared/dto';

export class AttractionListType {
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

class MetaDto{
  @ApiProperty()
  readonly totalItems: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly itemsPerPage: number;

  @ApiProperty()
  readonly totalPages: number;

  @ApiProperty()
  readonly currentPage: number;
}

export class AttractionListResponseType {
  @ApiProperty({
    type:()=>AttractionListType,
    isArray:true
  })
  readonly items: AttractionListType[];

  @ApiProperty({
    type:()=>MetaDto
  })
  readonly meta: MetaDto;
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
