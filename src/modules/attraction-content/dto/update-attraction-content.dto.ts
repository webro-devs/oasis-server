import { Tag } from "src/modules/tag/tag.entity";

class UpdateAttractionContentDto {
  readonly id: string;
  readonly title: string;
  readonly region:string
  readonly description: string;
  readonly langCode: string;
  tags: Tag[];
}
export default UpdateAttractionContentDto;
