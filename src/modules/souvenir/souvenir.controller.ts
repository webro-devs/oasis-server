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

import { CreateSouvenirDto, UpdateSouvenirDto } from './dto';
import { Souvenir } from './souvenir.entity';
import { SouvenirService } from './souvenir.service';

@ApiTags('Souvenir')
@Controller('souvenir')
export class SouvenirController {
  constructor(private readonly souvenirService: SouvenirService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all souvenirs' })
  @ApiOkResponse({
    description: 'The souvenirs were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.souvenirService.getAll();
  }
  
  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single souvenir by id' })
  @ApiOkResponse({
    description: 'The souvenir was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Souvenir> {
    return this.souvenirService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new souvenir' })
  @ApiCreatedResponse({
    description: 'The souvenir was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateSouvenirDto): Promise<Souvenir> {
    return await this.souvenirService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating souvenir' })
  @ApiOkResponse({
    description: 'Souvenir was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateSouvenirDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.souvenirService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting souvenir' })
  @ApiOkResponse({
    description: 'Souvenir was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.souvenirService.deleteOne(id);
  }
}
