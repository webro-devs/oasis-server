import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateLanguageto, UpdateLanguageto } from './dto';
import { LanguageService } from './language.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Language')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Public()
  @Get('/')
  @ApiOperation({ summary: 'Method: returns all languages' })
  @ApiOkResponse({
    description: 'The languages were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.languageService.getAll();
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new language' })
  @ApiCreatedResponse({
    description: 'The language was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateLanguageto) {
    return await this.languageService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating language' })
  @ApiOkResponse({
    description: 'Language was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateLanguageto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.languageService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting language' })
  @ApiOkResponse({
    description: 'Language was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.languageService.deleteOne(id);
  }
}
