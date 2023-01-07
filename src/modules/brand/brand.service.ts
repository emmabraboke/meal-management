import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CreateBrandDto } from './dtos/createbrand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(@Inject('Brand') private brandRepository: ModelClass<Brand>) {}

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brandExist = await this.findBrandByName(createBrandDto.name);

    if (brandExist) {
      throw new BadRequestException('brand exist already');
    }

    const brand = await this.brandRepository.query().insert(createBrandDto);

    return brand;
  }

  async findAllBrands(): Promise<Brand[]>{
    return await this.brandRepository.query()
  }

  async findBrandByName(name: string): Promise<Brand> {
    return await this.brandRepository.query().findOne({ name });
  }
}
