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

import { CreateEventDto, UpdateEventDto } from './dto';
import { Event } from './event.entity';
import { EventService } from './event.service';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all events' })
  @ApiOkResponse({
    description: 'The events were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData(@Query('langCode') langCode:string) {
    return await this.eventService.getAll(langCode);
  }

  @Get('/:title')
  @ApiOperation({ summary: 'Method: returns single event by title' })
  @ApiOkResponse({
    description: 'The event was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByUrl(@Query('langCode') langCode:string,@Param('title') title:string){
    return this.eventService.getByUrl(title,langCode);
  }

  @Get('/single/:id')
  @ApiOperation({ summary: 'Method: returns single event by id' })
  @ApiOkResponse({
    description: 'The event was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string,@Query('langCode') langCode:string) {
    return this.eventService.getOne(id,langCode);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new event' })
  @ApiCreatedResponse({
    description: 'The event was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateEventDto): Promise<Event> {
    return await this.eventService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating event' })
  @ApiOkResponse({
    description: 'Event was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateEventDto,
    @Param('id') id: string,
  ){
    return await this.eventService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting event' })
  @ApiOkResponse({
    description: 'Event was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.eventService.deleteOne(id);
  }
}
