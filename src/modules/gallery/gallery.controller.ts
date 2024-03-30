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
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateGalleryDto, UpdateGalleryDto } from './dto';
import { Gallery } from './gallery.entity';
import { GalleryService } from './gallery.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.galleryService.getAll();
  }

  @Public()
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Gallery> {
    return this.galleryService.getOne(id);
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
  ): Promise<UpdateResult> {
    return await this.galleryService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting gallery' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.galleryService.deleteOne(id);
  }
}
