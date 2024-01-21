import { Tag } from "src/modules/tag/tag.entity";

class UpdateTourContentDto {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly langCode: string;
  tags: Tag[];
}
export default UpdateTourContentDto;
