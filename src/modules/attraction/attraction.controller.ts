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
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateAttractionDto, UpdateAttractionDto } from './dto';
import { Attraction } from './attraction.entity';
import { AttractionService } from './attraction.service';

@ApiTags('Attraction')
@Controller('attraction')
export class AttractionController {
  constructor(private readonly attractionService: AttractionService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all attractions' })
  @ApiOkResponse({
    description: 'The attractions were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData(@Query('langCode') langCode:string) {
    return await this.attractionService.getAll(langCode);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single attraction by id' })
  @ApiOkResponse({
    description: 'The attraction was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string,@Query('langCode') langCode:string){
    return this.attractionService.getOne(id,langCode);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new attraction' })
  @ApiCreatedResponse({
    description: 'The attraction was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateAttractionDto): Promise<Attraction> {
    return await this.attractionService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating attraction' })
  @ApiOkResponse({
    description: 'Attraction was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateAttractionDto,
    @Param('id') id: string,
  ) {
    return await this.attractionService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting attraction' })
  @ApiOkResponse({
    description: 'Attraction was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.attractionService.deleteOne(id);
  }
}
