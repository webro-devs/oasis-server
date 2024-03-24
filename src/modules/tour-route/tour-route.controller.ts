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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateTourRouteListDto, UpdateTourRouteListDto } from './dto';
import { TourRouteService } from './tour-route.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Tour-Route')
@Controller('tour-route')
export class TourRouteController {
  constructor(private readonly tourRouteService: TourRouteService) {}

  @Public()
  @Get('/')
  @ApiOperation({ summary: 'Website  +++++++++++' })
  @ApiOkResponse({
    description: 'The tour routes were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData(@Query('langCode') langCode:string) {
    return await this.tourRouteService.getAll(langCode);
  }

  @Get('/for-admin')
  @ApiOperation({ summary: 'Method: returns all tour routes' })
  @ApiOkResponse({
    description: 'The tour routes were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getDataForAdmin(@Query('langCode') langCode:string) {
    return await this.tourRouteService.getAllForAdmin(langCode);
  }

  @Get('/for-update/:type')
  @ApiOperation({ summary: 'Method: returns all tour routes' })
  @ApiOkResponse({
    description: 'The tour routes were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getDataForUpdate(@Param('type') type:string, @Query('langCode') langCode: string) {
    return await this.tourRouteService.getOneForUpdate(type,langCode);
  }

  @Get('/for-tour')
  @ApiOperation({ summary: 'Method: returns all tour routes' })
  @ApiOkResponse({
    description: 'The tour routes were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByTitleForAdmin() {
    return await this.tourRouteService.getByTitleForAdmin();
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new tour route' })
  @ApiCreatedResponse({
    description: 'The tour route was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateTourRouteListDto) {
    return await this.tourRouteService.create(data);
  }

  @Put('/:type')
  @ApiOperation({ summary: 'Method: updating tour route' })
  @ApiOkResponse({
    description: 'Tour route was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateTourRouteListDto,
    @Param('type') type: string,
  ){
    return await this.tourRouteService.change(data,type);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting tour route' })
  @ApiOkResponse({
    description: 'Tour route was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.tourRouteService.deleteOne(id);
  }
}
