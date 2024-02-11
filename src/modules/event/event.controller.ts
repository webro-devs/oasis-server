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

import { CreateEventDto, UpdateEventDto } from './dto';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventListResponseType, EventSingleResponseType } from './dto/event-response.dto';
import { PaginationDto } from 'src/infra/shared/dto';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/')
  @ApiOperation({ summary: 'Website +++++++++++++++++' })
  @ApiOkResponse({
    description: 'The events were returned successfully',
    type: EventListResponseType,
    isArray:true
  })
  @HttpCode(HttpStatus.OK)
  async getData(@Query() query: PaginationDto) {
    return await this.eventService.getAll(query.langCode, {
      limit: query.limit,
      page: query.page,
    });
  }

  @Get('/for-admin')
  @ApiOperation({ summary: 'Admin ------------------' })
  @ApiOkResponse({
    description: 'The events were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getDataForAdmin(@Query() query: PaginationDto) {
    return await this.eventService.getAllForAdmin(query.langCode, {
      limit: query.limit,
      page: query.page,
    });
  }

  @Get('/:slug')
  @ApiOperation({ summary: 'Website +++++++++++++++++' })
  @ApiOkResponse({
    description: 'The event was returned successfully',
    type: EventSingleResponseType
  })
  @HttpCode(HttpStatus.OK)
  async getByUrl(
    @Query('langCode') langCode: string,
    @Param('slug') slug: string,
  ) {
    return this.eventService.getOne(slug, langCode);
  }

  @Get('/single-for-update/:id')
  @ApiOperation({ summary: 'Admin ------------------' })
  @ApiOkResponse({
    description: 'The attraction was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getOneForUpdate(
    @Param('id') id: string,
    @Query('langCode') langCode: string,
  ) {
    return this.eventService.getOneForUpdate(id, langCode);
  }

  @Post('/')
  @ApiOperation({ summary: 'Admin ------------------' })
  @ApiCreatedResponse({
    description: 'The event was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateEventDto): Promise<Event> {
    return await this.eventService.create(data);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Admin ------------------' })
  @ApiOkResponse({
    description: 'Event was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(@Body() data: UpdateEventDto, @Param('id') id: string) {
    return await this.eventService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Admin ------------------' })
  @ApiOkResponse({
    description: 'Event was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.eventService.deleteOne(id);
  }
}
