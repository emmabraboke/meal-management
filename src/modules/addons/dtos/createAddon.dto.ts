import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAddonDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsOptional()
  @ApiPropertyOptional()
  category: string;

  @IsOptional()
  brandId: string;
}
