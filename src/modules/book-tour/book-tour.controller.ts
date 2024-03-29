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

import { CreateBookTourDto, UpdateBookTourDto } from './dto';
import { BookTour } from './book-tour.entity';
import { BookTourService } from './book-tour.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Book-Tour')
@Controller('book-tour')
export class BookTourController {
  constructor(private readonly bookTourService: BookTourService) {}

  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.bookTourService.getAll();
  }

  @Public()
  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single book tour by id' })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<BookTour> {
    return this.bookTourService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new book tour' })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateBookTourDto) {
    return await this.bookTourService.create(data);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating book tour' })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateBookTourDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.bookTourService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting book tour' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.bookTourService.deleteOne(id);
  }
}
