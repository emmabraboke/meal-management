import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  userId: string;
}
