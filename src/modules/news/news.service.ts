import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateNewsDto, CreateNewsDto } from './dto';
import { News } from './news.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async getAll() {
    return await this.newsRepository.find({
      order: {
        title: 'ASC',
      },
    });
  }

  async getOne(id: string) {
    const data = await this.newsRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.newsRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateNewsDto, id: string) {
    const response = await this.newsRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateNewsDto) {
    const data = this.newsRepository.create(value);
    return await this.newsRepository.save(data);
  }
}
