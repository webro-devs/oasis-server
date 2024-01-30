import { NotFoundException, Injectable, HttpException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import slugify from 'slugify';

import { UpdatePageDto, CreatePageDto, PageDto } from './dto';
import { Page } from './page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageContentService } from '../page-content/page-content.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
    private readonly pageContService: PageContentService,
    private readonly configService: ConfigService,
  ) {}

  async getAll(langCode: string) {
    return await this.pageRepository.find({
      where: {
        isTopic: true,
        contents: {
          langCode,
        },
      },
      order: {
        index: 'ASC',
      },
      relations: {
        contents: true,
        pagesOnLeft: true,
        pagesOnRight: true,
      },
      select: {
        id: true,
        url: true,
        index: true,
        views: true,
        contents: {
          shortTitle: true,
          title: true,
        },
      },
    });
  }

  async getMenu(id: string, langCode: string, menu: string) {
    if (menu == 'left') {
      return await this.getLeftMenu(id, langCode);
    } else if (menu == 'right') {
      return await this.getRightMenu(id, langCode);
    }
  }

  async getLeftMenu(id: string, langCode: string) {
    const data = await this.pageRepository.findOne({
      where: { id },
      relations: {
        pagesOnLeft: true,
      },
      select: {
        id: true,
        pagesOnLeft: {
          id: true,
        },
      },
    });

    if (!data) return {};

    const ids = data?.pagesOnLeft?.map((p) => p.id);

    if (!ids?.length) return {};

    return await this.getMoreByIds(ids, langCode);
  }

  async getRightMenu(id: string, langCode: string) {
    const data = await this.pageRepository.findOne({
      where: { id },
      relations: {
        pagesOnRight: true,
      },
      select: {
        id: true,
        pagesOnRight: {
          id: true,
        },
      },
    });

    if (!data) return {};

    const ids = data?.pagesOnRight?.map((p) => p.id);

    if (!ids?.length) return {};

    return await this.getMoreByIds(ids, langCode);
  }

  async getOneForUpdate(id: string, langCode: string) {
    const data = await this.pageRepository.findOne({
      where: {
        id,
        contents: {
          langCode,
        },
      },
      relations: {
        contents: {
          tags: true,
        },
      },
    });

    return data.contents[0];
  }

  async getMoreByIds(ids: string[], langCode: string) {
    const data = await this.pageRepository.find({
      where: {
        id: In(ids),
        contents: { langCode },
      },
      relations: {
        pagesOnLeft: true,
        pagesOnRight: true,
        contents: true,
      },
      select: {
        slug: true,
        id: true,
        url: true,
        views: true,
        pagesOnLeft: {
          slug: true,
        },
        pagesOnRight: {
          slug: true,
        },
        contents: {
          shortTitle: true,
        },
      },
    });

    return data;
  }

  async getRightSide(slug: string, langCode: string) {
    const data = await this.pageRepository
      .findOne({
        relations: {
          pagesOnRight: {
            contents: true,
          },
        },
        where: {
          slug,
          contents: {
            langCode,
          },
        },
        select: {
          id: true,
          pagesOnRight: {
            slug: true,
            contents: {
              shortTitle: true,
              langCode: true,
            },
          },
        },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    const pagesOnRight = [];

    data.pagesOnRight.forEach((pr) => {
      const { shortTitle } = pr.contents.find((c) => c.langCode == langCode);
      pagesOnRight.push({
        slug: pr.slug,
        shortTitle,
      });
    });

    return pagesOnRight;
  }

  async getLeftSide(slug: string, langCode: string) {
    const data = await this.pageRepository
      .findOne({
        relations: {
          pagesOnLeft: {
            contents: true,
          },
        },
        where: {
          slug,
          contents: {
            langCode,
          },
        },
        select: {
          id: true,
          pagesOnLeft: {
            slug: true,
            contents: {
              shortTitle: true,
              langCode: true,
            },
          },
        },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    const pagesOnLeft = [];

    data.pagesOnLeft.forEach((pr) => {
      const { shortTitle } = pr.contents.find((c) => c.langCode == langCode);
      pagesOnLeft.push({
        slug: pr.slug,
        shortTitle,
      });
    });

    return pagesOnLeft;
  }
  async getContent(slug: string, langCode: string) {
    const data = await this.pageRepository
      .findOne({
        relations: {
          pagesOnLeft: {
            contents: true,
          },
          contents: {
            tags: true,
          },
        },
        where: {
          slug,
          contents: {
            langCode,
          },
        },
        select: {
          id: true,
          slug: true,
          contents: {
            title: true,
            descriptionPage: true,
          },
        },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    const content = [];

    data.pagesOnLeft?.forEach((pr) => {
      const { title, description } = pr.contents.find((c) => c.langCode == langCode );
      content.push({
        slug: pr.slug,
        title,
        description,
      });
    });

    const page: {} = data.contents[0];

    return { data: page, content };
  }

  async getById(id: string) {
    const data = await this.pageRepository.findOne({
      where: {
        id,
      },
    });

    return data;
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

  async create(
    value: CreatePageDto,
    data: any,
    path: { path: string; short: boolean },
  ) {
    const title = path.short
      ? value.contents.find((c) => c.langCode == 'en')?.title
      : '';
    if (!title && title !== '') {
      throw new HttpException('title in english should be exist', 400);
    }
    const url = await this.makeUrl(path.path, title);
    const slug = await this.makeSlug(title);

    const page = await this.pageRepository
      .createQueryBuilder()
      .insert()
      .into(Page)
      .values({ ...data, url, slug } as unknown as Page)
      .returning('id')
      .execute();

    const newPage = await this.getById(page.raw[0].id);
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

  async makeSlug(title: string) {
    const slug = slugify(title, { lower: true });

    const isExist = await this.pageRepository.findOne({
      where: { slug },
    });

    if (isExist) {
      return await this.makeSlug(slug + '_');
    }

    return slug;
  }
}
