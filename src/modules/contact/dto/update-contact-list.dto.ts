import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import UpdateContactDto from './update-contact.dto';

class UpdateContactList {
  @ApiProperty({
    description: `title`,
    isArray: true,
    example: [
      {
        id:'',
        title: '',
        address: '',
        email: '',
        phone: '',
        website: '',
        workingDays: '',
        workingHours: '',
        langCode: '',
      },
      {
        id:'',
        title: '',
        address: '',
        email: '',
        phone: '',
        website: '',
        workingDays: '',
        workingHours: '',
        langCode: '',
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  contents: UpdateContactDto[];
}

export default UpdateContactList;
