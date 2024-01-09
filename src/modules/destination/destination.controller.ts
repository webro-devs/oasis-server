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

import { CreateDestinationDto, UpdateDestinationDto } from './dto';
import { DestinationService } from './destination.service';

@ApiTags('Destination')
@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all destinations' })
  @ApiOkResponse({
    description: 'The destinations was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getAll(@Query('langCode') langCode:string){
    return this.destinationService.getAll(langCode);
  }

  @Get('/:title')
  @ApiOperation({ summary: 'Method: returns single destination by title' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByUrl(@Query('langCode') langCode:string,@Param('title') title:string){
    return this.destinationService.getByTitle(title,langCode);
  }

  @Get('/single/:id')
  @ApiOperation({ summary: 'Method: returns single destination by id' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getOne(@Query('langCode') langCode:string,@Param('id') id:string){
    return this.destinationService.getOne(id,langCode);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new destination' })
  @ApiCreatedResponse({
    description: 'The destination was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateDestinationDto) {
    return await this.destinationService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating destination' })
  @ApiOkResponse({
    description: 'Destination was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateDestinationDto,
    @Param('id') id: string,
  ){
    return await this.destinationService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting destination' })
  @ApiOkResponse({
    description: 'Destination was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.destinationService.deleteOne(id);
  }
}
