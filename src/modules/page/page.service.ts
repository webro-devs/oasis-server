import { NotFoundException, Injectable, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import slugify from 'slugify';

import { UpdatePageDto, CreatePageDto, PageDto } from './dto';
import { Page } from './page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageContentService } from '../page-content/page-content.service';
import { ConfigService } from '@nestjs/config';
import { TagTagDto } from 'src/infra/shared/dto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
    private readonly pageContService: PageContentService,
    private readonly configService: ConfigService,
  ) {}

  async getAll(langCode:string) {
    return await this.pageRepository.find({
      where: {
        isTopic: true,
        contents:{
          langCode
        }
      },
      order:{
        index:"ASC"
      },
      relations:{
        contents:true,
        pagesOnLeft:true,
        pagesOnRight:true
      },
      select:{
        id:true,
        url:true,
        index:true,
        contents:{
          shortTitle:true,
          title:true
        }
      }
    });
  }


  async getOne(id: string, langCode: string) {
    const data = await this.pageRepository
      .findOne({
        where: { 
          id,
          contents:{
            langCode
          }
         },
        relations: {
          pagesOnLeft:{
            contents:true
          },
          pagesOnRight:{
            contents:true
          },
          contents:true
        }
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

      data.pagesOnLeft.forEach(pr=>{
        pr.contents = pr.contents.filter(c=>c.langCode == langCode)
        pr.contents.forEach(c=>{
          delete c.descriptionPage
        })
      }) 
  
      data.pagesOnRight.forEach(pr=>{
        pr.contents = pr.contents.filter(c=>c.langCode == langCode)
        pr.contents.forEach(c=>{
          delete c.description
          delete c.title
          delete c.descriptionPage
        })
      })

    return data;
  }

  async getByUrl(path: string, langCode: string) {
    const url = this.configService.get('clientUrl') + path;

    const data = await this.pageRepository.findOne({
      where: {
        url,
      },
    });
    if (!data) return {};

    return await this.getOne(data.id, langCode);
  }

  async getById(id:string){
    const data = await this.pageRepository.findOne({
      where:{
        id
      }
    })

    return data
  }

  async deleteOne(id: string) {
    const response = await this.pageRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async addPageToLeftSide(data: PageDto) {
    const curPage = await this.pageRepository.findOne({
      where: { id: data.currentPage },
      relations: { pagesOnLeft: true },
    });

    const addPage = await this.pageRepository.findOne({
      where: { url: data.addedPage },
    });

    curPage.pagesOnLeft.push(addPage);
    await this.pageRepository.save(curPage);

    return curPage;
  }

  async addPageToRightSide(data: PageDto) {
    const curPage = await this.pageRepository.findOne({
      where: { id: data.currentPage },
      relations: { pagesOnRight: true },
    });

    const addPage = await this.pageRepository.findOne({
      where: { url: data.addedPage },
    });

    curPage.pagesOnRight.push(addPage);
    await this.pageRepository.save(curPage);

    return curPage;
  }

  async change(value: UpdatePageDto, id: string) {
    const page = await this.pageRepository.findOne({
      where: { id },
    });

    if (value.contents.length) {
      await this.pageContService.change(value.contents, page);
    }
  }

  async create(value: CreatePageDto, data: any, path:{path: string,short:boolean}) {
    const shortTitle =path.short ? value.contents.find((c) => c.langCode == 'en')
      ?.shortTitle : '';
    if (!shortTitle && shortTitle !== '') {
      throw new HttpException('short title in english should be exist', 400);
    }
    const url = await this.makeUrl(path.path, shortTitle);

    const page = await this.pageRepository
      .createQueryBuilder()
      .insert()
      .into(Page)
      .values({ ...data, url } as unknown as Page)
      .returning('id')
      .execute();

    const newPage = await this.getById(page.raw[0].id)
    await this.pageContService.create(value.contents, newPage);
    return page;
  }

  async makeUrl(path: string, shortTitle: string) {
    const url =
      this.configService.get('clientUrl') +
      path +
      slugify(shortTitle, { lower: true });
    const isExist = await this.pageRepository.findOne({
      where: { url },
    });

    if (isExist) {
      return url + '_';
    }

    return url;
  }

  async addTag(values: TagTagDto){
    await this.pageContService.addTag(values)
  }

  async removeTag(values: TagTagDto){
    await this.pageContService.removeTag(values)
  }
}
