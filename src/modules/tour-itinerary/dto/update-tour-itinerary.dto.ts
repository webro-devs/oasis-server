import UpdateTourItineraryContentDto from "./update-tour-itinerary-content.dto";

class UpdateTourItineraryDto {
  readonly id:string
  readonly days:UpdateTourItineraryContentDto[] 
}

export default UpdateTourItineraryDto;