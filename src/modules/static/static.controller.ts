import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Put,
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

import { CreateStaticDto, UpdateStaticDto } from './dto';
import { StaticService } from './static.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Static')
@Controller('static')
export class StaticController {
  constructor(private readonly staticService: StaticService) {}

  @Public()
  @Get('/')
  @ApiOperation({ summary: 'Website +++++++++++++++++++' })
  @ApiOkResponse({
    description: 'The statics were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData(@Query('langCode') langCode: string) {
    return await this.staticService.getAll(langCode);
  }

  @Get('/admin')
  @ApiOperation({ summary: 'Admin --------------------' })
  @ApiOkResponse({
    description: 'The statics were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getDataForAdmin() {
    return await this.staticService.getAllForAdmin();
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new static' })
  @ApiCreatedResponse({
    description: 'The static was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateStaticDto) {
    return await this.staticService.create(data);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating static' })
  @ApiOkResponse({
    description: 'Static was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateStaticDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.staticService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting static' })
  @ApiOkResponse({
    description: 'Static was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.staticService.deleteOne(id);
  }
}
