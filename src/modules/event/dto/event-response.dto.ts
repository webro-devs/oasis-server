import { ApiProperty } from '@nestjs/swagger';

export class EventListType {
  @ApiProperty()
  readonly date: string;

  @ApiProperty()
  readonly slug: string;

  @ApiProperty()
  readonly photo: string;

  @ApiProperty()
  readonly description: string;

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

export class EventListResponseType {
  @ApiProperty({
    type:()=>EventListType,
    isArray:true
  })
  readonly items: EventListType[];

  @ApiProperty({
    type:()=>MetaDto
  })
  readonly meta: MetaDto;
}

export class EventSingleResponseType {
  @ApiProperty()
  readonly slug: string;

  @ApiProperty()
  readonly photo: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly date: string;

  @ApiProperty()
  readonly description: string;
}

