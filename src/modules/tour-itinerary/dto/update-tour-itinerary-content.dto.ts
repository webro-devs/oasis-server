import { Tag } from "src/modules/tag/tag.entity";

class UpdateTourItineraryContentDto {
  id?:string
  day: string;
  title: string;
  description: string;
  langCode: string;
  tags: Tag[];
}

export default UpdateTourItineraryContentDto;
