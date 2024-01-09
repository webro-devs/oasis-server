class UpdateEventContentDto {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly description: string;
  readonly langCode: string;
  tags: string[];
}
export default UpdateEventContentDto;
