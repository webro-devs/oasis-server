class CreateTourPriceDto {
  readonly person: {langCode:string,person:string}[];
  readonly econome: string;
  readonly comfort: string;
  readonly deluxe: string;
}

export default CreateTourPriceDto;
