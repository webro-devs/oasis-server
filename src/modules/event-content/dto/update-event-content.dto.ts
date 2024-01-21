import { Tag } from "src/modules/tag/tag.entity";

class UpdateEventContentDto {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly description: string;
  readonly langCode: string;
  tags: Tag[];
}
export default UpdateEventContentDto;
