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
  @ApiOperation({ summary: 'Method: returns all tour category by type' })
  @ApiOkResponse({
    description: 'The tour category was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('langCode') langCode: string,
  ) {
    return this.tourCategoryService.getAll(langCode);
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
