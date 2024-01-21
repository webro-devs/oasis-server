import { Tag } from "src/modules/tag/tag.entity";

class CreateTourContentDto {
  readonly title: string;
  readonly description: string;
  readonly langCode: string;
  readonly tags: Tag[];
}

export default CreateTourContentDto;
