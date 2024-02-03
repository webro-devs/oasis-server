import { Tag } from "src/modules/tag/tag.entity";

class CreateEventContentDto {
  readonly title: string;
  readonly description: string;
  readonly langCode: string;
  readonly tags: Tag[];
}

export default CreateEventContentDto;
