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

import { CreateAttractionDto, UpdateAttractionDto } from './dto';
import { Attraction } from './attraction.entity';
import { AttractionService } from './attraction.service';
import { TagTagDto } from 'src/infra/shared/dto';

@ApiTags('Attraction')
@Controller('attraction')
export class AttractionController {
  constructor(
    private readonly attractionService: AttractionService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all attractions' })
  @ApiOkResponse({
    description: 'The attractions were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData(@Query('langCode') langCode:string,@Query('type') type:string) {
    return await this.attractionService.getAll(langCode,type);
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

  @Get('/:type/:title')
  @ApiOperation({ summary: 'Method: returns single attraction by id' })
  @ApiOkResponse({
    description: 'The attraction was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getByUrl(@Param('type') type: string,@Param('title') title: string,@Query('langCode') langCode:string){
    return this.attractionService.getByUrl(type,title,langCode);
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

  @Post('/add-tag')
  @ApiOperation({ summary: 'Method: adds new tag' })
  @ApiCreatedResponse({
    description: 'The tag was added successfully',
  })
  @HttpCode(HttpStatus.OK)
  async addTag(@Body() data: TagTagDto) {
    return await this.attractionService.addTag(data);
  }

  @Post('/remove-tag')
  @ApiOperation({ summary: 'Method: adds new tag' })
  @ApiCreatedResponse({
    description: 'The tag was added successfully',
  })
  @HttpCode(HttpStatus.OK)
  async removeTag(@Body() data: TagTagDto) {
    return await this.attractionService.removeTag(data);
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
