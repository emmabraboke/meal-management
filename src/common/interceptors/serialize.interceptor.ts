import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel } from '../model/response.model';

interface ClassConstructor {
  new (...args: any[]): {};
}

/**
 * This serialize data returned. its takes in a DTO as parameter, and exclude any field that is not exposed in the dto
 * @param dto
 * @returns
 */
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeDataInterceptor(dto));
}

export class SerializeDataInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: ResponseModel<any>) => {
        const responseData = plainToInstance(this.dto, data.data, {
          excludeExtraneousValues: true,
        });

        const responseModelData = new ResponseModel(
          data?.statusCode,
          data?.message,
          responseData,
        );

        return responseModelData;
      }),
    );
  }
}
