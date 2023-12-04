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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreatePageContentDto, UpdatePageContentDto } from './dto';
import { PageContent } from './page-content.entity';
import { PageContentService } from './page-content.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Page-Content')
@Controller('page-content')
export class PageContentController {
  constructor(private readonly pageContentService: PageContentService) {}

  @Public()
  @Get('/')
  @ApiOperation({ summary: 'Method: returns all page' })
  @ApiOkResponse({
    description: 'The page were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.pageContentService.getAll();
  }

  @Public()
  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single page by id' })
  @ApiOkResponse({
    description: 'The page was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<PageContent> {
    return this.pageContentService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new page' })
  @ApiCreatedResponse({
    description: 'The page was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreatePageContentDto): Promise<PageContent> {
    return await this.pageContentService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating page' })
  @ApiOkResponse({
    description: 'Page was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdatePageContentDto,
    @Param('id') id: string,
  ){
    return await this.pageContentService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting page' })
  @ApiOkResponse({
    description: 'Page was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.pageContentService.deleteOne(id);
  }
}
