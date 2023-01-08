// import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateAddonDto } from './createAddon.dto';

export class UpdateAddon {
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @IsOptional()
  @ApiPropertyOptional()
  price: number;

  @IsOptional()
  @ApiPropertyOptional()
  category: string;
}
