import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateDestinationTypeDto, CreateDestinationTypeDto } from './dto';
import { DestinationType } from './destination-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DestinationTypeService {
  constructor(
    @InjectRepository(DestinationType)
    private readonly destTypeRepository: Repository<DestinationType>,
  ) {}

  async getAll() {
    return await this.destTypeRepository.find({});
  }

  async getOne(id: string) {
    const data = await this.destTypeRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.destTypeRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateDestinationTypeDto, id: string) {
    const destination = await this.destTypeRepository.findOne({
      where: { id },
    });
  }

  async create(value: CreateDestinationTypeDto) {
    const destination = new DestinationType();
    await this.destTypeRepository.save(destination);
    return destination;
  }
}
