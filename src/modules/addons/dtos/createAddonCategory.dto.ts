import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAddonCategoryDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  brandId: string;
}
