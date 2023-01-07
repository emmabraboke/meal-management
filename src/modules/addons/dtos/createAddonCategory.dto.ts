import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAddonCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  brandId: string;
}
