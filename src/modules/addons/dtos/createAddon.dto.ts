import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAddonDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  category: string;

  @IsOptional()
  brandId: string;
}
