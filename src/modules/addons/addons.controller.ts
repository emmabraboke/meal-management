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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerConstant } from 'src/common/constants/swagger.constant';
import { PageDto } from '../../common/dtos/page.dto';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AddonsService } from './addons.service';
import { CreateAddonDto } from './dtos/createAddon.dto';
import { CreateAddonCategoryDto } from './dtos/createAddonCategory.dto';
import { ParamDto } from './dtos/param.dto';
import { UpdateAddon } from './dtos/updateAddon.dto';

@ApiBearerAuth()
@UseGuards(AdminGuard)
@Controller('brands')
export class AddonsController {
  constructor(private addonsService: AddonsService) {}

  @ApiTags('Meal Addons')
  @ApiOperation(SwaggerConstant.createMealAddon)
  @Post('/:brandId/addons')
  async createMealAddon(
    @Body() mealAddon: CreateAddonDto,
    @Param('brandId') brandId: string,
  ) {
    return await this.addonsService.createMealAddon(mealAddon, brandId);
  }

  @ApiTags('Meal Addons Category')
  @ApiOperation(SwaggerConstant.fetchAllMealAddonCategory)
  @Get('/addons/addon-categories')
  async findAllMealAddonCategories(@Query() pageDto: PageDto) {
    return await this.addonsService.findAllMealAddonCategories(pageDto);
  }

  @ApiTags('Meal Addons')
  @ApiOperation(SwaggerConstant.fetchMealAddonByBrandId)
  @Get('/:brandId/addons')
  async findMealAddonsByBrandId(
    @Param('brandId') brandId: string,
    @Query() pageDto: PageDto,
  ) {
    return await this.addonsService.findMealAddonsByBrandId(brandId, pageDto);
  }

  @ApiTags('Meal Addons')
  @ApiOperation(SwaggerConstant.fetchMealAddon)
  @Get('/:brandId/addons/:addonId')
  async findMealAddonsByIdAndBrandId(@Param() params: ParamDto) {
    return await this.addonsService.findMealAddonsByIdAndBrandId(params);
  }

  @ApiTags('Meal Addons')
  @ApiOperation(SwaggerConstant.updateMealAddon)
  @Patch('/:brandId/addons/:addonId')
  async updateMealAddons(
    @Body() mealAddon: UpdateAddon,
    @Param() params: ParamDto,
  ) {
    return await this.addonsService.updateMealAddons(mealAddon, params);
  }

  @ApiTags('Meal Addons')
  @ApiOperation(SwaggerConstant.deleteMealAddon)
  @Delete('/:brandId/addons/:addonId')
  async deleteMealAddons(@Param() params: ParamDto) {
    return await this.addonsService.deleteMealAddons(params);
  }

  @ApiTags('Meal Addons Category')
  @ApiOperation(SwaggerConstant.createMealAddonCategory)
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
