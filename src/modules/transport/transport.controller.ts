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

import { CreateTransportDto, UpdateTransportDto } from './dto';
import { Transport } from './transport.entity';
import { TransportService } from './transport.service';
import { TransportType } from 'src/infra/shared/type';

@ApiTags('NavBar')
@Controller('')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Get('/content/:type')
  @ApiOperation({ summary: 'Method: returns single transport content' })
  @ApiOkResponse({
    description: 'The transport was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getContent(
    @Param('type') type: TransportType,
    @Query('langCode') langCode: string,
  ) {
    return this.transportService.getContent(type, langCode);
  }

  @Get('/right/:type')
  @ApiOperation({ summary: 'Method: returns single transport right side' })
  @ApiOkResponse({
    description: 'The transport was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getRightSide(
    @Param('type') type: TransportType,
    @Query('langCode') langCode: string,
  ) {
    return this.transportService.getRightSide(type, langCode);
  }

  @Get('/left/:type')
  @ApiOperation({ summary: 'Method: returns single transport left side' })
  @ApiOkResponse({
    description: 'The transport was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getLeftSide(
    @Param('type') type: TransportType,
    @Query('langCode') langCode: string,
  ) {
    return this.transportService.getLeftSide(type, langCode);
  }

  @Get('/single-for-update/:type')
  @ApiOperation({ summary: 'Method: returns single destination by id for update' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByIdForUpdate(@Param('type') type:TransportType, @Query('langCode') langCode:string){
    return this.transportService.getOneForUpdate(type, langCode);
  }

  @Get('/:type/:menu')
  @ApiOperation({ summary: 'Method: returns destination menu' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMenu(@Query('langCode') langCode:string,@Param('menu') menu:string,@Param('type') type:TransportType){
    return this.transportService.getMenu(type,langCode,menu);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new transport' })
  @ApiCreatedResponse({
    description: 'The transport was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateTransportDto) {
    return await this.transportService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating transport' })
  @ApiOkResponse({
    description: 'Transport was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(@Body() data: UpdateTransportDto, @Param('id') id: string) {
    return await this.transportService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting transport' })
  @ApiOkResponse({
    description: 'Transport was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.transportService.deleteOne(id);
  }
}
