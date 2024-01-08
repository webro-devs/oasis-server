import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateDestinationDto, CreateDestinationDto } from './dto';
import { Destination } from './destination.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from '../page/page.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    private readonly pageService: PageService,
    private readonly configService: ConfigService
  ) {}

  async getAll(langCode:string) {
    const data = await this.destinationRepository.find({
      where:{
        page:{
          contents:{
            langCode
          }
        }
      },
      relations:{
        page:{
          pagesOnLeft:true,
          pagesOnRight:true,
          contents:true
        }
      },
      select:{
        page:{
          id:true,
          url:true,
          contents:{
            shortTitle:true
          }
        }
      }
    });
    return data
  }

  async getOne(id:string,langCode:string) {
    const data = await this.destinationRepository
      .findOne({
        relations:{
          page:{
            pagesOnLeft:{
              contents:true
            },
            pagesOnRight:{
              contents:true
            },
            contents:true
          }
        },
        where:{
          id,
          page:{
            contents:{
              langCode
            }
          }
        }
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    data.page.pagesOnLeft.forEach(pr=>{
      pr.contents = pr.contents.filter(c=>c.langCode == langCode)
      pr.contents.forEach(c=>{
        delete c.descriptionPage
        delete c.langCode
      })
    }) 

    data.page.pagesOnRight.forEach(pr=>{
      pr.contents = pr.contents.filter(c=>c.langCode == langCode)
      pr.contents.forEach(c=>{
        delete c.description
        delete c.title
        delete c.descriptionPage
        delete c.langCode
      })
    })

    return data;
  }

  async getByTitle(title:string, langCode:string){
    const url = this.configService.get('clientUrl') +`destination/${title}`
    
    const data = await this.destinationRepository.findOne({
      where:{
        page:{
          url
        }
      }
    })
    //
    
    if(!data) return {}

    return await this.getOne(data.id, langCode)
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
      relations:{
        page:true
      }
    });
    
    await this.pageService.change(value, destination.page.id);
  }

  async create(value: CreateDestinationDto) {
    const destination = new Destination();
    await this.destinationRepository.save(destination);

    await this.pageService.create(value, {destination,isTopic:false},{path:'destination/', short:true});
    return destination;
  }
}
