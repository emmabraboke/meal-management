import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export class ResponseModel<T> {
  statusCode: string;
  message: string;
  data: T;

  constructor(statusCode: string, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}


interface ClassConstructor {
  new (...args: any[]): {};
}

/**
 * This decorator serves to serialize the data being returned to the requesting client. It takes a DTO as a parameter and trims off every data point that is not exposed in the passed DTO.
 *
 * It is intended only for data that is wrapped by our custom ResponseModel.
 * @param dto
 * @returns
 */
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeModelledDataInterceptor(dto));
}


export class SerializeModelledDataInterceptor implements NestInterceptor {
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

        // const responseModelData = new ResponseModel(
        //   data?.statusCode,
        //   data?.message,
        //   responseData,
        // );

        return responseData
      }),
    );
  }
}
