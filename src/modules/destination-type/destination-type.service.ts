import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateDestinationTypeDto, CreateDestinationTypeDto } from './dto';
import { DestinationType } from './destination-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from '../page/page.service';

@Injectable()
export class DestinationTypeService {
  constructor(
    @InjectRepository(DestinationType)
    private readonly destTypeRepository: Repository<DestinationType>,
    private readonly pageService: PageService,
  ) {}

  async getAll() {
    return await this.destTypeRepository.find({
      relations: {
        page: {
          contents: true,
        },
      },
    });
  }

  async getOne(id: string, langCode: string) {
    const data = await this.destTypeRepository
      .findOne({
        where: { id },
        relations: {
          page: true,
        },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    const res = await this.pageService.getOne(data.page.id, langCode);

    return res;
  }

  async deleteOne(id: string) {
    const response = await this.destTypeRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateDestinationTypeDto, id: string) {
    const destinationType = await this.destTypeRepository.findOne({
      where: { id },
      relations: {
        page: true,
      },
    });

    if (value.contents.length) {
      await this.pageService.change(value, destinationType.page.id);
    }
  }

  async create(value: CreateDestinationTypeDto) {
    const destinationType = new DestinationType();
    await this.destTypeRepository.save(destinationType);

    if (value.contents.length) {
      await this.pageService.create(
        { contents: value.contents },
        { destinationType, isTopic: false },
      );
    }

    return destinationType;
  }
}
