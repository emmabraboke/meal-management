import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerConstant } from '../../common/constants/swagger.constant';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { PageDto } from '../../common/dtos/page.dto';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../user/entities/user.entity';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dtos/createbrand.dto';

@ApiTags('Brands')
@ApiBearerAuth()
@Controller('brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @ApiOperation(SwaggerConstant.createBrand)
  @Post()
  @UseGuards(AdminGuard)
  async createBrand(
    @Body() createBrandDto: CreateBrandDto,
    @CurrentUser() user: User,
  ) {
    return await this.brandService.createBrand(createBrandDto, user.id);
  }

  @ApiOperation(SwaggerConstant.fetchAllBrand)
  @Get()
  @UseGuards(AuthGuard)
  async findAllBrands(@Query() pageDto: PageDto) {
    return await this.brandService.findAllBrands(pageDto);
  }
}
