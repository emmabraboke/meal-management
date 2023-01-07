import { HttpStatus } from "@nestjs/common";

export class ResponseModel<T> {
  statusCode: HttpStatus;
  message: string;
  data: T;

  constructor(statusCode: HttpStatus, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
