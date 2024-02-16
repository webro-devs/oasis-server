import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import CreateContactDto from './create-contact.dto';

class CreateContactList {
    @ApiProperty({
      description: `title`,
      isArray:true,
      example: {
        title:'',
        address:'',
        email:'',
        phone:'',
        website:'',
        workingDays:'',
        workingHours:'',
        langCode:''
      },
    })
    @IsNotEmpty()
    @IsArray()
    contents: CreateContactDto[]
  }

  export default CreateContactList