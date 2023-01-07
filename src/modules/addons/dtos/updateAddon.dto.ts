// import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateAddonDto } from './createAddon.dto';

export class UpdateAddon {
    @IsOptional()
    name: string;
  
    @IsOptional()
    description: string;
  
    @IsOptional()
    price: number;
  
    @IsOptional()
    category: string;
  
   
}