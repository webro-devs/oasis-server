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

import { CreateFeedbackDto, UpdateFeedbackDto } from './dto';
import { Feedback } from './feedback.entity';
import { FeedbackService } from './feedback.service';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbaackService: FeedbackService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all feedbacks' })
  @ApiOkResponse({
    description: 'The feedbacks were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.feedbaackService.getAll();
  }
  
  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single feedback by id' })
  @ApiOkResponse({
    description: 'The feedback was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Feedback> {
    return this.feedbaackService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new feedback' })
  @ApiCreatedResponse({
    description: 'The feedback was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateFeedbackDto): Promise<Feedback> {
    return await this.feedbaackService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating feedback' })
  @ApiOkResponse({
    description: 'Feedback was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateFeedbackDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.feedbaackService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting feedback' })
  @ApiOkResponse({
    description: 'Feedback was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.feedbaackService.deleteOne(id);
  }
}
