import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dtos/createbrand.dto';

@Controller('brands')
@UseGuards(AdminGuard)
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Post()
  @UseGuards(AdminGuard)
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandService.createBrand(createBrandDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAllBrands(){
    return await this.brandService.findAllBrands()
  }
}
