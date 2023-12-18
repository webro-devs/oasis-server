import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateFeedbackDto, CreateFeedbackDto } from './dto';
import { Feedback } from './feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async getAll() {
    return await this.feedbackRepository.find({
      order: {
        date: 'DESC',
      },
    });
  }

  async getOne(id: string) {
    const data = await this.feedbackRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.feedbackRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateFeedbackDto, id: string) {
    const response = await this.feedbackRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateFeedbackDto) {
    const data = this.feedbackRepository.create(value);
    return await this.feedbackRepository.save(data);
  }
}
