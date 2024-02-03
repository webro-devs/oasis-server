import { ApiProperty } from '@nestjs/swagger';


class PageSideResponseType {
  @ApiProperty()
  readonly slug: string;

  @ApiProperty()
  readonly shortTitle: string;
}

class PageContentResponseType {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly descriptionPage: string;

  @ApiProperty({
    isArray:true,
    type: ()=>ContentPageDto,
  })
  readonly content: {
    slug: string;
    title: string;
    description: string;
  }[];
}

class ContentPageDto{
  @ApiProperty()
  readonly slug: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;
}

export default {PageContentResponseType,PageSideResponseType}