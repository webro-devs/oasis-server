import { Tag } from "src/modules/tag/tag.entity";

class CreateAttractionContentDto {
  readonly title: string;
  readonly region:string
  readonly description: string;
  readonly langCode: string;
  readonly tags: Tag[];
}

export default CreateAttractionContentDto;
