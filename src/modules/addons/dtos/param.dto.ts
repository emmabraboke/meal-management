import { IsNotEmpty, IsOptional } from 'class-validator';

export class ParamDto {
  @IsOptional()
  brandId: string;

  @IsOptional()
  addonId: string;
}
