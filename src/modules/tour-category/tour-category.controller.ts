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

import { CreateTourCategoryDto, UpdateTourCategoryDto } from './dto';
import { TourCategoryService } from './tour-category.service';

@ApiTags('Tour-Category')
@Controller('tour-category')
export class TourCategoryController {
  constructor(private readonly tourCategoryService: TourCategoryService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all tour category for home page' })
  @ApiOkResponse({
    description: 'The tour category was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('langCode') langCode: string,
  ) {
    return this.tourCategoryService.getAll(langCode);
  }

  @Get('/for-tours-page')
  @ApiOperation({ summary: 'Method: returns all tour category for tour page' })
  @ApiOkResponse({
    description: 'The tour category was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getAllForTourPage(
    @Query('langCode') langCode: string,
  ) {
    return this.tourCategoryService.getAllForTourPage(langCode);
  }

  @Get('/for-admin-page')
  @ApiOperation({ summary: 'Method: returns all tour category for admin' })
  @ApiOkResponse({
    description: 'The tour category was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getAllForAdminPage(
    @Query('langCode') langCode: string,
  ) {
    return this.tourCategoryService.getAllForAdmin(langCode);
  }

  @Get('/:type')
  @ApiOperation({ summary: 'Method: returns single tour category by type' })
  @ApiOkResponse({
    description: 'The tour category was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(
    @Param('type') type: string,
    @Query('langCode') langCode: string,
  ) {
    return this.tourCategoryService.getOne(type, langCode);
  }

  @Get('/single-for-update/:id')
  @ApiOperation({ summary: 'Method: returns single tour category by id for update' })
  @ApiOkResponse({
    description: 'The tour category was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByIdForUpdate(@Param('id') id:string, @Query('langCode') langCode:string){
    return this.tourCategoryService.getOneForUpdate(id, langCode);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new tour category' })
  @ApiCreatedResponse({
    description: 'The tour category was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateTourCategoryDto) {
    return await this.tourCategoryService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating tour category' })
  @ApiOkResponse({
    description: 'Tour category was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(@Body() data: UpdateTourCategoryDto, @Param('id') id: string) {
    return await this.tourCategoryService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting tour category' })
  @ApiOkResponse({
    description: 'Tour category was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.tourCategoryService.deleteOne(id);
  }
}
