import { Tag } from "src/modules/tag/tag.entity";

class CreatePageContentDto {
  readonly title: string;
  readonly shortTitle: string;
  readonly description: string;
  readonly descriptionPage: string;
  readonly langCode: string;
  readonly tags: Tag[];
}

export default CreatePageContentDto;
