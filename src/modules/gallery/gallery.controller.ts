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

  @Public()
  @Get('/for-site')
  @HttpCode(HttpStatus.OK)
  async getForSite(@Query() query: PaginationDto) {
    return await this.galleryService.getForSite(query.langCode, {
      limit: query.limit,
      page: query.page,
    });
  }

  @Public()
  @Get('/for-home-site')
  @HttpCode(HttpStatus.OK)
  async getForHomeSite() {
    return await this.galleryService.getForHomeSite()
  }

  @Get('/single-for-update/:id')
  @ApiOperation({ summary: 'Website ++++++++++++++' })
  @HttpCode(HttpStatus.OK)
  async getOneForUpdate(
    @Param('id') id: string,
    @Query('langCode') langCode: string,
  ) {
    return this.galleryService.getOneForUpdate(id, langCode);
  }

  @Get('/single-for-site/:slug')
  @ApiOperation({ summary: 'Website ++++++++++++++' })
  @HttpCode(HttpStatus.OK)
  async getOne(
    @Param('slug') slug: string,
    @Query('langCode') langCode: string,
  ) {
    return this.galleryService.getOne(slug, langCode);
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
