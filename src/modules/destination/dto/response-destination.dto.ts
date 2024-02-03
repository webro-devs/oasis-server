import { ApiProperty } from '@nestjs/swagger';

export class DestinationListWebsiteResponseType {
  @ApiProperty()
  readonly slug: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly shortTitle: string;
}

export class DestinationSideResponseType {
  @ApiProperty()
  readonly slug: string;

  @ApiProperty()
  readonly shortTitle: string;
}

export class DestinationContentResponseType {
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
