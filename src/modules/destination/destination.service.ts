import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateDestinationDto, CreateDestinationDto } from './dto';
import { Destination } from './destination.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DestinationContentService } from '../destination-content/destination-content.service';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    private readonly destContService: DestinationContentService,
  ) {}

  async getAll() {
    return await this.destinationRepository.find({});
  }

  async getOne(id: string) {
    const data = await this.destinationRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
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
    });
    
    await this.destContService.change(value.contents, destination);
  }

  async create(value: CreateDestinationDto) {
    const destination = new Destination();
    await this.destinationRepository.save(destination);
    await this.destContService.create(value.contents, destination);
    return destination;
  }
}
