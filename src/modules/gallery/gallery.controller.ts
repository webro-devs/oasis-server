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
  Query,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateGalleryDto, UpdateGalleryDto } from './dto';
import { Gallery } from './gallery.entity';
import { GalleryService } from './gallery.service';
import { Public } from '../auth/decorators/public.decorator';
import { PaginationDto } from 'src/infra/shared/dto';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getData(@Query() query: PaginationDto) {
    return await this.galleryService.getAll(query.langCode, {
      limit: query.limit,
      page: query.page,
    });
  }

  @Get('/single-for-update/:id')
  @ApiOperation({ summary: 'Admin ------------------' })
  @HttpCode(HttpStatus.OK)
  async getOneForUpdate(
    @Param('id') id: string,
    @Query('langCode') langCode: string,
  ) {
    return this.galleryService.getOneForUpdate(id, langCode);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new gallery' })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateGalleryDto) {
    return await this.galleryService.create(data);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating gallery' })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateGalleryDto,
    @Param('id') id: string,
  ) {
    return await this.galleryService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting gallery' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.galleryService.deleteOne(id);
  }
}
