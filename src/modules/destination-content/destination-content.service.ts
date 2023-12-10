import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateDestinationContentDto, CreateDestinationContentDto } from './dto';
import { DestinationContent } from './destination-content.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DestinationContentService {
  constructor(
    @InjectRepository(DestinationContent)
    private readonly destinationContentRepository: Repository<DestinationContent>,
  ) {}

  async deleteOne(id: string) {
    const response = await this.destinationContentRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateDestinationContentDto, id: string) {
    const response = await this.destinationContentRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateDestinationContentDto) {
    const data = this.destinationContentRepository.create(value);
    return await this.destinationContentRepository.save(data);
  }
}
