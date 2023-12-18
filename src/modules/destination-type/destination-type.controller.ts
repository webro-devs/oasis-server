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
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateDestinationTypeDto, UpdateDestinationTypeDto } from './dto';
import { DestinationType } from './destination-type.entity';
import { DestinationTypeService } from './destination-type.service';

@ApiTags('Destination-Type')
@Controller('destination-type')
export class DestinationTypeController {
  constructor(private readonly destTypeService: DestinationTypeService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all destinations' })
  @ApiOkResponse({
    description: 'The destinations were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.destTypeService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single destination by id' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<DestinationType> {
    return this.destTypeService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new destination' })
  @ApiCreatedResponse({
    description: 'The destination was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateDestinationTypeDto) {
    return await this.destTypeService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating destination' })
  @ApiOkResponse({
    description: 'Destination was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateDestinationTypeDto,
    @Param('id') id: string,
  ){
    return await this.destTypeService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting destination' })
  @ApiOkResponse({
    description: 'Destination was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.destTypeService.deleteOne(id);
  }
}
