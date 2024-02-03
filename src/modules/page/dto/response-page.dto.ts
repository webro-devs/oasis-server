import { ApiProperty } from '@nestjs/swagger';

export class PageListWebsiteResponseType {
  @ApiProperty()
  readonly slug: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly shortTitle: string;
}

export class PageSideResponseType {
  @ApiProperty()
  readonly slug: string;

  @ApiProperty()
  readonly shortTitle: string;
}

export class PageContentResponseType {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly descriptionPage: string;

  @ApiProperty({
    isArray: true,
    type: { slug: '', title: '', description: '' },
  })
  readonly content: {
    slug: string;
    title: string;
    description: string;
  }[];
}
