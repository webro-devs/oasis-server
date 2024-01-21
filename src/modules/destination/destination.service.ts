import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateDestinationDto, CreateDestinationDto } from './dto';
import { Destination } from './destination.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from '../page/page.service';
import { ConfigService } from '@nestjs/config';
import slugify from 'slugify';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    private readonly pageService: PageService,
    private readonly configService: ConfigService,
  ) {}

  async getAll(langCode: string) {
    const data = await this.destinationRepository.find({
      where: {
        page: {
          contents: {
            langCode,
          },
        },
      },
      order: {
        index: 'ASC',
      },
      relations: {
        page: {
          pagesOnLeft: {
            contents:true
          },
          pagesOnRight: {
            contents:true
          },
          contents: true,
        },
      },
      select: {
        slug:true,
        index:true,
        id:true,
        views:true,
        page: {
          id: true,
          url: true,
          contents: {
            shortTitle: true,
          },
          pagesOnLeft:{
            slug:true,
            index:true,
            contents:{
              langCode:true,
              shortTitle:true
            }
          },
          pagesOnRight:{
            slug:true,
            index:true,
            contents:{
              langCode:true,
              shortTitle:true
            }
          }
        },
      },
    });

    data.forEach(d=>{
      d.page.pagesOnLeft.forEach(pl=>{
        pl.contents = pl.contents.filter(c=> c.langCode == langCode)
      })
      d.page.pagesOnRight.forEach(pl=>{
        pl.contents = pl.contents.filter(c=> c.langCode == langCode)
      })
    })
    return data;
  }

  async getAllForSite(langCode: string) {
    const data = await this.destinationRepository.find({
      where: {
        page: {
          contents: {
            langCode,
          },
        },
      },
      order: {
        index: 'ASC',
      },
      relations: {
        page: {
          contents: true,
        },
      },
      select: {
        page: {
          id: true,
          slug:true,
          contents: {
            shortTitle: true,
          },
        },
      },
    });

    const res = []
    data.forEach(d=>{
      res.push({
        id:d.id,
        shortTitle:d.page.contents[0].shortTitle,
        title: d.slug
      })
    })
    return res;
  }

  async getMenu(id:string,langCode:string, menu:string){
    if(menu == 'left'){
      return await this.getLeftMenu(id, langCode)
    }else if(menu == 'right'){
      return await this.getRightMenu(id, langCode)
    }
  }

  async getLeftMenu(id:string, langCode:string){
    const data = await this.destinationRepository.findOne({
      where:{id},
      relations:{
        page:{
          pagesOnLeft:true
        }
      },
      select:{
        id:true,
        page:{
          id:true,
          pagesOnLeft:{
            id:true
          }
        }
      }
    })

    if(!data) return {}

    const ids = data?.page?.pagesOnLeft?.map(p=> p.id)

    if(!ids?.length) return {}

    return await this.pageService.getMoreByIds(ids,langCode)
  }

  async getRightMenu(id:string, langCode:string){
    const data = await this.destinationRepository.findOne({
      where:{id},
      relations:{
        page:{
          pagesOnRight:true
        }
      },
      select:{
        id:true,
        page:{
          id:true,
          pagesOnRight:{
            id:true
          }
        }
      }
    })

    if(!data) return {}

    const ids = data?.page?.pagesOnRight?.map(p=> p.id)

    if(!ids?.length) return {}

    return await this.pageService.getMoreByIds(ids,langCode)
  }

  async getOneForUpdate(id:string, langCode:string){
    const data = await this.destinationRepository.findOne({
      where:{
        id,
        page:{
          contents:{
            langCode
          }
        }
      },
      relations:{
        page:{
          contents:{
            tags:true
          }
        }
      }
    })

    return data.page.contents[0]
  }

  async getOne(slug: string, langCode: string) {
    const data = await this.destinationRepository
      .findOne({
        relations: {
          page: {
            pagesOnLeft: {
              contents: true,
            },
            pagesOnRight: {
              contents: true,
            },
            contents: {
              tags:true
            },
          },
        },
        where: {
          slug,
          page: {
            contents: {
              langCode,
            },
          },
        },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

      const pagesOnLeft = []
      const pagesOnRight = []

      data.page.pagesOnLeft.forEach(pr=>{
        pr.contents = pr.contents.filter(c=>c.langCode == langCode)
        pagesOnLeft.push({
          slug:pr.slug,
          title:pr.contents[0]?.title,
          shortTitle: pr.contents[0]?.shortTitle,
          description: pr.contents[0]?.description
        })
      }) 
  
      data.page.pagesOnRight.forEach(pr=>{
        pr.contents = pr.contents.filter(c=>c.langCode == langCode)
        pagesOnRight.push({
          slug:pr.slug,
          shortTitle: pr.contents[0]?.shortTitle,
        })
      })
      delete data.page.pagesOnLeft
      delete data.page.pagesOnRight

      return {...data,pagesOnLeft,pagesOnRight};
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
      relations: {
        page: true,
      },
    });

    await this.pageService.change(value, destination.page.id);
  }

  async create(value: CreateDestinationDto) {
    const title = value.contents.find((c) => c.langCode == 'en')
      ?.title;
    if (!title) {
      throw new HttpException('title in english should be exist', 400);
    }

    const destination = new Destination();
    destination.slug = await this.makeSlug(title)
    await this.destinationRepository.save(destination);

    await this.pageService.create(
      value,
      { destination, isTopic: false },
      { path: 'destination/', short: true },
    );
    return destination;
  }

  async makeSlug(title: string) {
    const slug = slugify(title, { lower: true });

    const isExist = await this.destinationRepository.findOne({
      where: { slug },
    });

    if (isExist) {
      return await this.makeSlug(slug + '_')
    }

    return slug;
  }
}
