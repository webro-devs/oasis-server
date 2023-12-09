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

import { CreateNewsDto, UpdateNewsDto } from './dto';
import { News } from './news.entity';
import { NewsService } from './news.service';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all news' })
  @ApiOkResponse({
    description: 'The news were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.newsService.getAll();
  }
  
  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single news by id' })
  @ApiOkResponse({
    description: 'The news was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<News> {
    return this.newsService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new news' })
  @ApiCreatedResponse({
    description: 'The news was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateNewsDto): Promise<News> {
    return await this.newsService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating news' })
  @ApiOkResponse({
    description: 'News was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateNewsDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.newsService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting news' })
  @ApiOkResponse({
    description: 'News was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.newsService.deleteOne(id);
  }
}
