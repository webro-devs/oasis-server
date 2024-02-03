import { ApiProperty } from '@nestjs/swagger';

export class DestinationListWebsiteResponseType {
  @ApiProperty()
  readonly slug: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly shortTitle: string;
}


