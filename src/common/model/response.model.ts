import { HttpStatus } from '@nestjs/common';
import { PageMetaDTO } from '../dtos/pageMeta.dto';

export class ResponseModel<T> {
  statusCode: HttpStatus;
  message: string;
  data: T;
  pagination: PageMetaDTO;

  constructor(
    statusCode: HttpStatus,
    message: string,
    data: T,
    pagination?: PageMetaDTO,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.pagination = pagination;
  }
}
