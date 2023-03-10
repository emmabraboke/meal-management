import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ModelClass } from 'objection';
import { PageDto } from '../../common/dtos/page.dto';
import { PageMetaDTO } from '../../common/dtos/pageMeta.dto';
import { ResponseModel } from '../../common/model/response.model';
import { CreateBrandDto } from './dtos/createbrand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(@Inject('Brand') private brandRepository: ModelClass<Brand>) {}

  async createBrand(
    createBrandDto: CreateBrandDto,
    userId: string,
  ): Promise<ResponseModel<Brand>> {
    createBrandDto.userId = userId;
    const brandExist = await this.findBrandByName(createBrandDto.name);

    if (brandExist) {
      throw new BadRequestException('brand exist already');
    }

    const brand = await this.brandRepository.query().insert(createBrandDto);

    return new ResponseModel(
      HttpStatus.CREATED,
      'successfully created brand',
      brand,
    );
  }

  async findAllBrands(pageDto: PageDto): Promise<ResponseModel<Brand[]>> {
    const brands = await this.brandRepository
      .query()
      .page(pageDto.pageNumber, pageDto.pageSize);

    const pageMetaDto = new PageMetaDTO({
      page: pageDto.pageNumber + 1,
      pageSize: pageDto.pageSize,
      currentPageItems: brands.results.length,
      totalItems: brands.total,
    });
    return new ResponseModel(
      HttpStatus.OK,
      'successfully fetched all brands',
      brands.results,
      pageMetaDto,
    );
  }

  async findBrandByName(name: string): Promise<Brand> {
    return await this.brandRepository.query().findOne({ name });
  }
}
