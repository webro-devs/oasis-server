import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Get,
  Query,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateTourCategoryDto, UpdateTourCategoryDto } from './dto';
import { TourCategoryService } from './tour-category.service';
import { PaginationDto } from 'src/infra/shared/dto';

@ApiTags('Tour-Category')
@Controller('tour-category')
export class TourCategoryController {
  constructor(private readonly tourCategoryService: TourCategoryService) {}

  @Get('/')
  @ApiOperation({ summary: 'Website +++++++++++++++++++' })
  @ApiOkResponse({
    description: 'The tour category was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('langCode') langCode: string,
  ) {
    return this.tourCategoryService.getAll(langCode);
  }

  @Get('/for-admin-page')
  @ApiOperation({ summary: 'Admin -------------------------' })
  @ApiOkResponse({
    description: 'The tour category was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getAllForAdminPage(
    @Query() query: PaginationDto,
  ) {
    return this.tourCategoryService.getAllForAdmin(query.langCode, {
      limit: query.limit,
      page: query.page
    });
  }

  @Get('/left-side')
  @ApiOperation({ summary: 'Website +++++++++++++++++++' })
  @ApiOkResponse({
    description: 'The tour category left side was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getLeftSide(
    @Query('langCode') langCode: string,
  ) {
    return this.tourCategoryService.getLeftSide(langCode);
  }

  @Get('/:slug')
  @ApiOperation({ summary: 'Website +++++++++++++++++++' })
  @ApiOkResponse({
    description: 'The tour category was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(
    @Param('slug') type: string,
    @Query('langCode') langCode: string,
  ) {
    return this.tourCategoryService.getOne(type, langCode);
  }

  @Get('/single-for-update/:id')
  @ApiOperation({ summary: 'Admin -------------------------' })
  @ApiOkResponse({
    description: 'The tour category was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByIdForUpdate(@Param('id') id:string, @Query('langCode') langCode:string){
    return this.tourCategoryService.getOneForUpdate(id, langCode);
  }

  @Post('/')
  @ApiOperation({ summary: 'Admin -------------------------' })
  @ApiCreatedResponse({
    description: 'The tour category was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateTourCategoryDto) {
    return await this.tourCategoryService.create(data);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Admin -------------------------' })
  @ApiOkResponse({
    description: 'Tour category was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(@Body() data: UpdateTourCategoryDto, @Param('id') id: string) {
    return await this.tourCategoryService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Admin -------------------------' })
  @ApiOkResponse({
    description: 'Tour category was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.tourCategoryService.deleteOne(id);
  }
}
