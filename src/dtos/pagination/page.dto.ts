import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class PageDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(30)
  @IsOptional()
  pageSize?: number = 20;

  get pageNumber(): number {
    return this.page - 1;
  }
}
