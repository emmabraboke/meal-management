// import { Test, TestingModule } from '@nestjs/testing';
// import { BrandController } from './brand.controller';
// import { BrandService } from './brand.service';
// import { CreateBrandDto } from './dtos/createbrand.dto';

// describe('BrandService', () => {
//   let service: BrandService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [{provide: BrandService, useValue:{}}],
//       controllers: [BrandController]
//     }).compile();

//     service = module.get(BrandService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('signup and login',  () => {

//     const createBrandDto: CreateBrandDto = {
//       name: 'emmaspi',
//       userId: "",
//     }

//     const userId = "3390f0ea-2c46-41d5-901c-7297704af5dc"

//     it('sign up', async () => {

//     const result = await service.createBrand(createBrandDto, userId)

//       expect(result).toEqual({createBrandDto, userId})
//     })

//   })

// });
