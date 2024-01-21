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
}
export default UpdatePageDto;
