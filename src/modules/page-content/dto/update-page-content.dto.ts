class UpdatePageContentDto {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly description: string;
  readonly descriptionPage: string;
  readonly langCode: string;
  tags: string[];
}
export default UpdatePageContentDto;
