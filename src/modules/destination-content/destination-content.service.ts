import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  UpdateDestinationContentDto,
  CreateDestinationContentDto,
} from './dto';
import { DestinationContent } from './destination-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from '../tag/tag.service';
import { Destination } from '../destination/destination.entity';

@Injectable()
export class DestinationContentService {
  constructor(
    @InjectRepository(DestinationContent)
    private readonly destContRepo: Repository<DestinationContent>,
    private readonly tagService: TagService,
  ) {}

  async deleteOne(id: string) {
    const response = await this.destContRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(
    values: UpdateDestinationContentDto[],
    destination: Destination,
  ) {
    const newContents = values.filter((dc) => !dc.id);
    const olderContents = values.filter((dc) => dc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        const tags = await this.tagService.getMoreByIds(value.tags);
        await this.destContRepo.update({ id: value.id }, { ...value, tags });
      }),
    );
    
    newContents.length ? await this.create(newContents, destination) : null;
  }

  async create(
    values: CreateDestinationContentDto[],
    destination: Destination,
  ) {
    await Promise.all(
      values.map(async (value) => {
        const tags = await this.tagService.getMoreByIds(value.tags);

        const data = this.destContRepo.create({ ...value, tags, destination });

        return await this.destContRepo.save(data);
      }),
    );
  }
}
