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

@ApiTags('Transport')
@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Get('/:type')
  @ApiOperation({ summary: 'Method: returns single transport by type' })
  @ApiOkResponse({
    description: 'The transport was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(
    @Param('type') type: TransportType,
    @Query('langCode') langCode: string,
  ): Promise<Transport> {
    return this.transportService.getOne(type, langCode);
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
