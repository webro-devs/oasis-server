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
import { DestinationContentResponseType, DestinationListWebsiteResponseType, DestinationSideResponseType } from './dto/response-destination.dto';

@ApiTags('Destination')
@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Get('/')
  @ApiOperation({ summary: 'Admin ------------------' })
  @ApiOkResponse({
    description: 'The destinations was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getAll(@Query('langCode') langCode:string){
    return this.destinationService.getAll(langCode);
  }

  @Get('/for-site')
  @ApiOperation({ summary: 'Website +++++++++++++++++' })
  @ApiOkResponse({
    description: 'The destinations was returned successfully',
    type: DestinationListWebsiteResponseType,
    isArray:true
  })
  @HttpCode(HttpStatus.OK)
  async getAllForSite(@Query('langCode') langCode:string){
    return this.destinationService.getAllForSite(langCode);
  }

  @Get('/single-for-update/:id')
  @ApiOperation({ summary: 'Admin ------------------' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByIdForUpdate(@Param('id') id:string, @Query('langCode') langCode:string){
    return this.destinationService.getOneForUpdate(id, langCode);
  }

  @Get('/right/:slug')
  @ApiOperation({ summary: 'Website +++++++++++++++++' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
    type: DestinationSideResponseType,
    isArray:true
  })
  @HttpCode(HttpStatus.OK)
  async getRightSide(@Query('langCode') langCode:string,@Param('slug') slug:string){
    return this.destinationService.getRightSide(slug,langCode);
  }

  @Get('/content/:slug')
  @ApiOperation({ summary: 'Website +++++++++++++++++' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
    type: DestinationContentResponseType
  })
  @HttpCode(HttpStatus.OK)
  async GetLeftSide(@Query('langCode') langCode:string,@Param('slug') slug:string){
    return this.destinationService.getContent(slug,langCode);
  }

  @Get('/left/:slug')
  @ApiOperation({ summary: 'Website +++++++++++++++++' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
    type: DestinationSideResponseType,
    isArray:true
  })
  @HttpCode(HttpStatus.OK)
  async getContent(@Query('langCode') langCode:string,@Param('slug') slug:string){
    return this.destinationService.getLeftSide(slug,langCode);
  }

  @Get('/:id/:menu')
  @ApiOperation({ summary: 'Admin ------------------' })
  @ApiOkResponse({
    description: 'The destination was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMenu(@Query('langCode') langCode:string,@Param('menu') menu:string,@Param('id') id:string){
    return this.destinationService.getMenu(id,langCode,menu);
  }

  @Post('/')
  @ApiOperation({ summary: 'Admin ------------------' })
  @ApiCreatedResponse({
    description: 'The destination was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateDestinationDto) {
    return await this.destinationService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Admin ------------------' })
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
  @ApiOperation({ summary: 'Admin ------------------' })
  @ApiOkResponse({
    description: 'Destination was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.destinationService.deleteOne(id);
  }
}
