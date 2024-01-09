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

import { CreateTourDto, UpdateTourDto } from './dto';
import { Tour } from './tour.entity';
import { TourService } from './tour.service';
import { TagTagDto } from 'src/infra/shared/dto';

@ApiTags('Tour')
@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all tours' })
  @ApiOkResponse({
    description: 'The tours were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
   
  }
  
  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single tour by id' })
  @ApiOkResponse({
    description: 'The tour was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Tour> {
    return this.tourService.getOne(id);
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

  @Post('/add-tag')
  @ApiOperation({ summary: 'Method: adds new tag' })
  @ApiCreatedResponse({
    description: 'The tag was added successfully',
  })
  @HttpCode(HttpStatus.OK)
  async addTag(@Body() data: TagTagDto) {
    return await this.tourService.addTag(data);
  }

  @Post('/remove-tag')
  @ApiOperation({ summary: 'Method: adds new tag' })
  @ApiCreatedResponse({
    description: 'The tag was added successfully',
  })
  @HttpCode(HttpStatus.OK)
  async removeTag(@Body() data: TagTagDto) {
    return await this.tourService.removeTag(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating tour' })
  @ApiOkResponse({
    description: 'Tour was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateTourDto,
    @Param('id') id: string,
  ){
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
