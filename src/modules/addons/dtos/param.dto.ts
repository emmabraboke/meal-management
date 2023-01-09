import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ParamDto {
  @IsOptional()
  @ApiProperty()
  brandId: string;

  @IsOptional()
  @ApiProperty()
  addonId: string;
}
