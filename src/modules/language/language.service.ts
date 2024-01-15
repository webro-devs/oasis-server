import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateLanguageto, CreateLanguageto } from './dto';
import { Language } from './language.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async getAll() {
    const data = await this.languageRepository.find();
    return data;
  }

  async deleteOne(id: string) {
    const response = await this.languageRepository.delete(id);
    return response;
  }

  async change(value: UpdateLanguageto, id: string) {
    const response = await this.languageRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateLanguageto) {
    const data = this.languageRepository.create(value);
    return await this.languageRepository.save(data);
  }
}
