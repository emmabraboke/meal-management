import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PageDto } from '../../dtos/pagination/page.dto';
import { AdminGuard } from '../../guards/admin.guard';
import { AddonsService } from './addons.service';
import { CreateAddonDto } from './dtos/createAddon.dto';
import { CreateAddonCategoryDto } from './dtos/createAddonCategory.dto';
import { ParamDto } from './dtos/param.dto';
import { UpdateAddon } from './dtos/updateAddon.dto';

@Controller('brands')
@UseGuards(AdminGuard)
export class AddonsController {
  constructor(private addonsService: AddonsService) {}

  @Post('/:brandId/addons')
  async createMealAddon(
    @Body() mealAddon: CreateAddonDto,
    @Param('brandId') brandId: string,
  ) {
    return await this.addonsService.createMealAddon(mealAddon, brandId);
  }

  @Get('/addons/addon-categories')
  async findAllMealAddonCategories(@Query() pageDto: PageDto,) {
    return await this.addonsService.findAllMealAddonCategories(pageDto);
  }

  @Get('/:brandId/addons')
  async findMealAddonsByBrandId(
    @Param('brandId') brandId: string,
    @Query() pageDto: PageDto,
  ) {
    return await this.addonsService.findMealAddonsByBrandId(brandId, pageDto);
  }

  @Get('/:brandId/addons/:addonId')
  async findMealAddonsByIdAndBrandId(@Param() params: ParamDto) {
    return await this.addonsService.findMealAddonsByIdAndBrandId(params);
  }

  @Patch('/:brandId/addons/:addonId')
  async updateMealAddons(
    @Body() mealAddon: UpdateAddon,
    @Param() params: ParamDto,
  ) {
    return await this.addonsService.updateMealAddons(mealAddon, params);
  }

  @Delete('/:brandId/addons/:addonId')
  async deleteMealAddons(@Param() params: ParamDto) {
    return await this.addonsService.deleteMealAddons(params);
  }

  @Post('/:brandId/addons/addon-categories')
  async createMealAddonCategory(
    @Body() mealAddonCategory: CreateAddonCategoryDto,
    @Param('brandId') brandId: string,
  ) {
    return await this.addonsService.createMealAddonCategory(
      mealAddonCategory,
      brandId,
    );
  }
}
