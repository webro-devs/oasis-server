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
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreatePageDto, PageDto, UpdatePageDto } from './dto';
import { Page } from './page.entity';
import { PageService } from './page.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Page')
@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Public()
  @Get('/')
  @ApiOperation({ summary: 'Method: returns all page' })
  @ApiOkResponse({
    description: 'The page were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData(@Query('langCode') langCode:string) {
    return await this.pageService.getAll(langCode);
  }

  @Get('/content/:slug')
  @ApiOperation({ summary: 'Method: returns single page content' })
  @ApiOkResponse({
    description: 'The page was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getContent(@Query('langCode') langCode:string,@Param('slug') slug:string){
    return this.pageService.getContent(slug,langCode);
  }

  @Get('/right/:slug')
  @ApiOperation({ summary: 'Method: returns single page right side' })
  @ApiOkResponse({
    description: 'The page was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getRightSide(@Query('langCode') langCode:string,@Param('slug') slug:string){
    return this.pageService.getRightSide(slug,langCode);
  }

  @Get('/left/:slug')
  @ApiOperation({ summary: 'Method: returns single page left side' })
  @ApiOkResponse({
    description: 'The page was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getLeftSide(@Query('langCode') langCode:string,@Param('slug') slug:string){
    return this.pageService.getLeftSide(slug,langCode);
  }

  @Get('/single-for-update/:id')
  @ApiOperation({ summary: 'Method: returns single page by id for update' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByIdForUpdate(@Param('id') id:string, @Query('langCode') langCode:string){
    return this.pageService.getOneForUpdate(id, langCode);
  }

  @Get('/:id/:menu')
  @ApiOperation({ summary: 'Method: returns page menu' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMenu(@Query('langCode') langCode:string,@Param('menu') menu:string,@Param('id') id:string){
    return this.pageService.getMenu(id,langCode,menu);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new page' })
  @ApiCreatedResponse({
    description: 'The page was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreatePageDto){
    return await this.pageService.create(data,{isTopic:true},{path:'page/',short:true});
  }

  @Post('/add-page-to-left')
  @ApiOperation({ summary: 'Method: adds a page to some page left side' })
  @ApiCreatedResponse({
    description: 'The page was added successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async addPageToLeftSide(@Body() data: PageDto): Promise<Page> {
    return await this.pageService.addPageToLeftSide(data);
  }

  @Post('/add-page-to-right')
  @ApiOperation({ summary: 'Method: adds page to some page right side' })
  @ApiCreatedResponse({
    description: 'The page was added successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async addPageToRightSide(@Body() data: PageDto): Promise<Page> {
    return await this.pageService.addPageToRightSide(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating page' })
  @ApiOkResponse({
    description: 'Page was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdatePageDto,
    @Param('id') id: string,
  ){
    return await this.pageService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting page' })
  @ApiOkResponse({
    description: 'Page was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.pageService.deleteOne(id);
  }
}
