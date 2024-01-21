import { Tag } from "src/modules/tag/tag.entity";

class CreateTourItineraryContentDto {
  day: string;
  title: string;
  description: string;
  langCode: string;
  tags: Tag[];
}

export default CreateTourItineraryContentDto;
