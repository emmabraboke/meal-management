import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ModelClass } from 'objection';
import { PageDto } from '../../common/dtos/page.dto';
import { PageMetaDTO } from '../../common/dtos/pageMeta.dto';
import { ResponseModel } from '../../common/model/response.model';
import { CreateAddonDto } from './dtos/createAddon.dto';
import { CreateAddonCategoryDto } from './dtos/createAddonCategory.dto';
import { ParamDto } from './dtos/param.dto';
import { UpdateAddon } from './dtos/updateAddon.dto';
import { AddonCategory } from './entities/addonCategory.entity';
import { Addon } from './entities/addon.entity';

@Injectable()
export class AddonsService {
  constructor(
    @Inject('Addon') private addonRepository: ModelClass<Addon>,
    @Inject('AddonCategory')
    private addonCategoryRepository: ModelClass<AddonCategory>,
  ) {}

  async createMealAddon(
    createAddonDto: CreateAddonDto,
    brandId: string,
  ): Promise<ResponseModel<Addon>> {
    createAddonDto.brandId = brandId;
    const mealAddon = await this.addonRepository.query().insert(createAddonDto);

    return new ResponseModel(
      HttpStatus.CREATED,
      'successfully created meal addon',
      mealAddon,
    );
  }

  async findMealAddonsByBrandId(
    brandId: string,
    pageDto: PageDto,
  ): Promise<ResponseModel<Addon[]>> {
    const mealAddon = await this.addonRepository
      .query()
      .where('brandId', brandId)
      .page(pageDto.pageNumber, pageDto.pageSize);

    const pageMetaDto = new PageMetaDTO({
      page: pageDto.pageNumber + 1,
      pageSize: pageDto.pageSize,
      currentPageItems: mealAddon.results.length,
      totalItems: mealAddon.total,
    });
    return new ResponseModel(
      HttpStatus.OK,
      'successfully fetched meal addons',
      mealAddon.results,
      pageMetaDto,
    );
  }

  async findMealAddonsByIdAndBrandId(
    params: ParamDto,
  ): Promise<ResponseModel<Addon>> {
    const [mealAddon] = await this.addonRepository
      .query()
      .where('id', params.addonId)
      .where('brandId', params.brandId);

    return new ResponseModel(
      HttpStatus.OK,
      'successfully fetched meal addons',
      mealAddon,
    );
  }

  async updateMealAddons(
    updateAddon: UpdateAddon,
    params: ParamDto,
  ): Promise<ResponseModel<any>> {
    const mealAddon = await this.addonRepository
      .query()
      .patch(updateAddon)
      .where('id', params.addonId)
      .where('brandId', params.brandId);

    if (!mealAddon) {
      throw new NotFoundException('Update failed, addons not found');
    }

    return new ResponseModel(
      HttpStatus.OK,
      'successfully updated meal addons',
      null,
    );
  }

  async deleteMealAddons(params: ParamDto): Promise<ResponseModel<any>> {
    const mealAddon = await this.addonRepository
      .query()
      .delete()
      .where('id', params.addonId)
      .where('brandId', params.brandId);

    if (!mealAddon) {
      throw new NotFoundException('Delete failed, addons not found');
    }

    return new ResponseModel(
      HttpStatus.OK,
      'successfully deleted meal addons',
      null,
    );
  }

  async createMealAddonCategory(
    createAddonCategoryDto: CreateAddonCategoryDto,
    brandId: string,
  ): Promise<ResponseModel<AddonCategory>> {
    createAddonCategoryDto.brandId = brandId;
    const mealAddonCategoryExist =
      await this.findMealAddonCategoryByNameAndBrandId(
        createAddonCategoryDto.name,
        createAddonCategoryDto.brandId,
      );

    if (mealAddonCategoryExist) {
      throw new BadRequestException('brand exist already');
    }

    const mealAddonCategory = await this.addonCategoryRepository
      .query()
      .insert(createAddonCategoryDto);

    return new ResponseModel(
      HttpStatus.CREATED,
      'successfully created meal addon category',
      mealAddonCategory,
    );
  }

  async findAllMealAddonCategories(
    pageDto: PageDto,
  ): Promise<ResponseModel<AddonCategory[]>> {
    const mealAddonCategories = await this.addonCategoryRepository
      .query()
      .page(pageDto.pageNumber, pageDto.pageSize);

    const pageMetaDto = new PageMetaDTO({
      page: pageDto.pageNumber + 1,
      pageSize: pageDto.pageSize,
      currentPageItems: mealAddonCategories.results.length,
      totalItems: mealAddonCategories.total,
    });

    return new ResponseModel(
      HttpStatus.CREATED,
      'successfully fetched all meal addon categories',
      mealAddonCategories.results,
      pageMetaDto,
    );
  }

  async findMealAddonCategoryByNameAndBrandId(
    name: string,
    brandId: string,
  ): Promise<AddonCategory> {
    return await this.addonCategoryRepository
      .query()
      .findOne({ name, brandId });
  }
}
