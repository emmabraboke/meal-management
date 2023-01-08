import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/user.decorator';
import { PageDto } from 'src/dtos/pagination/page.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from '../user/entities/user.entity';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dtos/createbrand.dto';

@Controller('brands')
@UseGuards(AdminGuard)
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Post()
  @UseGuards(AdminGuard)
  async createBrand(
    @Body() createBrandDto: CreateBrandDto,
    @CurrentUser() user: User,
  ) {
    return await this.brandService.createBrand(createBrandDto, user);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAllBrands(@Query() pageDto: PageDto) {
    return await this.brandService.findAllBrands(pageDto);
  }
}
