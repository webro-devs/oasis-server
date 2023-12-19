class UpdateRoadTransportDto {
  readonly id : string
  readonly type: {langCode:string,type:string}[];
  readonly seat: string;
  readonly bag: string;
  readonly photo: string;
}
export default UpdateRoadTransportDto;
