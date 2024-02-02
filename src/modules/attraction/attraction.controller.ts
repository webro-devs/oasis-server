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

import { CreateAttractionDto, UpdateAttractionDto } from './dto';
import { Attraction } from './attraction.entity';
import { AttractionService } from './attraction.service';
import { AttractionListResponseType, AttractionSingleResponseType } from './dto/response-attraction.dto';

@ApiTags('Attraction')
@Controller('attraction')
export class AttractionController {
  constructor(
    private readonly attractionService: AttractionService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'Website +++++++++++++' })
  @ApiOkResponse({
    description: 'The attractions were returned successfully',
    type: AttractionListResponseType,
    isArray:true
  })
  @HttpCode(HttpStatus.OK)
  async getData(@Query('langCode') langCode:string,@Query('type') type:string) {
    return await this.attractionService.getAll(langCode,type);
  }

  @Get('/:slug')
  @ApiOperation({ summary: 'Website +++++++++++++' })
  @ApiOkResponse({
    description: 'The attraction was returned successfully',
    type: AttractionSingleResponseType
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('slug') slug: string,@Query('langCode') langCode:string){
    return this.attractionService.getOne(slug,langCode);
  }

  @Get('/single-for-update/:id')
  @ApiOperation({ summary: 'Admin ------------------' })
  @ApiOkResponse({
    description: 'The attraction was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getOneForUpdate(@Param('id') id: string,@Query('langCode') langCode:string){
    return this.attractionService.getOneForUpdate(id,langCode);
  }

  @Post('/')
  @ApiOperation({ summary: 'Admin ------------------' })
  @ApiCreatedResponse({
    description: 'The attraction was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateAttractionDto): Promise<Attraction> {
    return await this.attractionService.create(data);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Admin ------------------' })
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
  @ApiOperation({ summary: 'Admin ------------------' })
  @ApiOkResponse({
    description: 'Attraction was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.attractionService.deleteOne(id);
  }
}
