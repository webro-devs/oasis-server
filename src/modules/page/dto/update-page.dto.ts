import { IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdatePageContentDto } from 'src/modules/page-content/dto';
class UpdatePageDto {
    @ApiProperty({
      description: `contents`,
      example: [
        {
          id:'uuid',
          langCode: '',
          title: '',
          shortTitle: '',
          shortDescription: '',
          description: '',
          descriptionPage: '',
          tags: [
            {
              id:'',
              title:''
            }
          ],
        },
        {
          langCode: '',
          title: '',
          shortTitle: '',
          shortDescription: '',
          description: '',
          descriptionPage: '',
          tags: [
            {
              id:'',
              title:''
            }
          ],
        },
      ],
    })
    @IsOptional()
    @IsArray()
    readonly contents: UpdatePageContentDto[];

    @ApiProperty({
      description: `descImages`,
      example: ['',''],
    })
    @IsOptional()
    @IsArray()
    readonly descImages: string[]
}
export default UpdatePageDto;
