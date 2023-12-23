import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateDestinationDto, CreateDestinationDto } from './dto';
import { Destination } from './destination.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from '../page/page.service';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    private readonly pageService: PageService,
  ) {}

  async getAll() {
    const data = await this.destinationRepository.find({});
    return data
  }

  async getOne(id:string,langCode:string) {
    const [data] = await this.destinationRepository
      .find({
        relations:{
          page:true
        },
        where:{
          id
        }
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    const res = await this.pageService.getOne(data.page.id, langCode)

    return res;
  }

  async deleteOne(id: string) {
    const response = await this.destinationRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateDestinationDto, id: string) {
    const destination = await this.destinationRepository.findOne({
      where: { id },
      relations:{
        page:true
      }
    });
    
    await this.pageService.change(value, destination.page.id);
  }

  async create(value: CreateDestinationDto) {
    const destination = new Destination();
    await this.destinationRepository.save(destination);

    await this.pageService.create(value, {destination,isTopic:false},'destination/');
    return destination;
  }
}
