import { Tag } from "src/modules/tag/tag.entity";

class UpdatePageContentDto {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly description: string;
  readonly descriptionPage: string;
  readonly langCode: string;
  tags: Tag[];
}
export default UpdatePageContentDto;
