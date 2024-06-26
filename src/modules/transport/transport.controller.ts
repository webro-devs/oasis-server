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

import { CreateTransportDto, UpdateTransportDto } from './dto';
import { TransportService } from './transport.service';
import { TransportType } from 'src/infra/shared/type';
import { PageResponseTypeDto } from 'src/infra/shared/dto';

@ApiTags('NavBar')
@Controller('')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Get('/content/:slug')
  @ApiOperation({ summary: 'Website ++++++++++++++++++++++' })
  @ApiOkResponse({
    description: 'The transport was returned successfully',
    type: PageResponseTypeDto.PageContentResponseType,
  })
  @HttpCode(HttpStatus.OK)
  async getContent(
    @Param('slug') type: TransportType,
    @Query('langCode') langCode: string,
    @Query('destination') destination: string,
  ) {
    return this.transportService.getContent(destination, type, langCode);
  }

  @Get('/for-admin/:type')
  @ApiOperation({ summary: 'Admin -----------------' })
  @ApiOkResponse({
    description: 'The transport was returned successfully',
    type: PageResponseTypeDto.PageContentResponseType,
  })
  @HttpCode(HttpStatus.OK)
  async getForAdmin(@Param('type') type: TransportType,@Query('langCode') langCode:string) {
    return this.transportService.getForAdmin(langCode,type);
  }

  @Get('/right/:slug')
  @ApiOperation({ summary: 'Website ++++++++++++++++++++++' })
  @ApiOkResponse({
    description: 'The transport was returned successfully',
    type: PageResponseTypeDto.PageSideResponseType,
  })
  @HttpCode(HttpStatus.OK)
  async getRightSide(
    @Param('slug') type: TransportType,
    @Query('langCode') langCode: string,
    @Query('destination') destination: string,
  ) {
    return this.transportService.getRightSide(destination, type, langCode);
  }

  @Get('/left/:slug')
  @ApiOperation({ summary: 'Website ++++++++++++++++++++++' })
  @ApiOkResponse({
    description: 'The transport was returned successfully',
    type: PageResponseTypeDto.PageSideResponseType,
  })
  @HttpCode(HttpStatus.OK)
  async getLeftSide(
    @Param('slug') type: TransportType,
    @Query('langCode') langCode: string,
    @Query('destination') destination: string,
  ) {
    return this.transportService.getLeftSide(destination, type, langCode);
  }

  @Get('/single-for-update/:type')
  @ApiOperation({ summary: 'Admin -------------------------' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByIdForUpdate(
    @Param('type') type: TransportType,
    @Query('langCode') langCode: string,
    @Query('destination') destination: string,
  ) {
    return this.transportService.getOneForUpdate(destination, type, langCode);
  }

  @Get('/:type/:menu')
  @ApiOperation({ summary: 'Admin -------------------------' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMenu(
    @Param('menu') menu: string,
    @Param('type') type: TransportType,
    @Query('langCode') langCode: string,
    @Query('destination') destination: string,
  ) {
    return this.transportService.getMenu(destination, type, langCode, menu);
  }

  @Post('/')
  @ApiOperation({ summary: 'Admin -------------------------' })
  @ApiCreatedResponse({
    description: 'The transport was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateTransportDto) {
    return await this.transportService.create(data);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Admin -------------------------' })
  @ApiOkResponse({
    description: 'Transport was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(@Body() data: UpdateTransportDto, @Param('id') id: string) {
    return await this.transportService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Admin -------------------------' })
  @ApiOkResponse({
    description: 'Transport was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.transportService.deleteOne(id);
  }

  @Delete('/road-transport/:id')
  @ApiOperation({ summary: 'Admin -------------------------' })
  @ApiOkResponse({
    description: 'Transport was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRoadTransport(@Param('id') id: string) {
    return await this.transportService.deleteRoadTransport(id);
  }
}
