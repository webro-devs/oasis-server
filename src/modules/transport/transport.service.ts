import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateTransportDto, CreateTransportDto } from './dto';
import { Transport } from './transport.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from '../page/page.service';
import { RoadTransportService } from '../road-transport/road-transport.service';
import { TransportType } from 'src/infra/shared/type';

@Injectable()
export class TransportService {
  constructor(
    @InjectRepository(Transport)
    private readonly transportRepository: Repository<Transport>,
    private readonly pageService: PageService,
    private readonly roadTransService: RoadTransportService
  ) {}

  async getOne(type: TransportType, langCode:string) {
    const data = await this.transportRepository
      .findOne({
        where: { type },
        relations:{
          page:{
            contents:true,
            pagesOnLeft:true,
            pagesOnRight:true
          }
        }
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.transportRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateTransportDto, id: string) {
    const transport = await this.transportRepository.findOne({
      where: { id },
      relations:{
        page:true
      }
    });
    
    if(value?.contents?.length){
      await this.pageService.change(value, transport.page.id);
    }

    if(value?.roadTransports?.length){
      await this.roadTransService.change(value.roadTransports,transport.id)
    }
  }

  async create(value: CreateTransportDto) {
    const transport = new Transport();
    transport.type = value.type
    await this.transportRepository.save(transport);

    await this.pageService.create(value, {transport,isTopic:false});
    if(value?.roadTransports?.length){
      await this.roadTransService.create(value.roadTransports, transport.id)
    }
    return transport;
  }
}
