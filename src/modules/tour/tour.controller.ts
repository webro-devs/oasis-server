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
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateTourDto, UpdateTourDto } from './dto';
import { Tour } from './tour.entity';
import { TourService } from './tour.service';
import { PaginationDto } from 'src/infra/shared/dto';

@ApiTags('Tour')
@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get('/for-site')
  @ApiOperation({ summary: 'Method: returns all tours' })
  @ApiOkResponse({
    description: 'The tours were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getDataForSite(@Query() query: PaginationDto) {
    return await this.tourService.getAllForSite(
      { limit: query.limit, page: query.page },
      query.langCode,
    );
  }

  @Get('/for-admin/:id')
  @ApiOperation({ summary: 'Method: returns all tours' })
  @ApiOkResponse({
    description: 'The tours were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getAllForAdmin(@Query() query: PaginationDto, @Param('id') id:string) {
    return await this.tourService.getAllForAdmin(
      { limit: query.limit, page: query.page },
      query.langCode,
      id
    );
  }

  @Get('/:slug')
  @ApiOperation({ summary: 'Website  ++++++++++++++++++++' })
  @ApiOkResponse({
    description: 'The tour was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(
    @Param('slug') slug: string,
    @Query('langCode') langCode: string,
  ) {
    return this.tourService.getOne(slug, langCode);
  }

  @Get('/:slug/:type')
  @ApiOperation({ summary: 'Website  ++++++++++++++++++++' })
  @ApiOkResponse({
    description: 'The tour was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getTourFields(
    @Param('slug') slug: string,
    @Query('langCode') langCode: string,
    @Param('type') type: string,
  ) {
    return this.tourService.getOneFields(slug, langCode, type);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new tour' })
  @ApiCreatedResponse({
    description: 'The tour was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateTourDto) {
    return await this.tourService.create(data);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating tour' })
  @ApiOkResponse({
    description: 'Tour was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(@Body() data: UpdateTourDto, @Param('id') id: string) {
    return await this.tourService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting tour' })
  @ApiOkResponse({
    description: 'Tour was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.tourService.deleteOne(id);
  }
}
