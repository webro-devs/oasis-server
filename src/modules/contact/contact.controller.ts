import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateContactList, UpdateContactDto } from './dto';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Get('/')
  @ApiOperation({ summary: 'Method: returns all contacts' })
  @ApiOkResponse({
    description: 'The contacts were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.contactService.getAll();
  }

  @Public()
  @Get('/:langCode')
  @ApiOperation({ summary: 'Website +++++++++++++++++++++++++' })
  @ApiOkResponse({
    description: 'The contact was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('langCode') langCode: string): Promise<Contact> {
    return this.contactService.getOne(langCode);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new contact' })
  @ApiCreatedResponse({
    description: 'The contact was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateContactList) {
    return await this.contactService.createMore(data);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating contact' })
  @ApiOkResponse({
    description: 'Contact was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateContactDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.contactService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting contact' })
  @ApiOkResponse({
    description: 'Contact was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.contactService.deleteOne(id);
  }
}
