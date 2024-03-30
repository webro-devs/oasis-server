import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import {
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreatePartnerDto, UpdatePartnerDto } from './dto';
import { Partner } from './partner.entity';
import { PartnerService } from './partner.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Partner')
@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.partnerService.getAll();
  }

  @Public()
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Partner> {
    return this.partnerService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new partner' })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreatePartnerDto) {
    return await this.partnerService.create(data);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating partner' })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdatePartnerDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.partnerService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting partner' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.partnerService.deleteOne(id);
  }
}
