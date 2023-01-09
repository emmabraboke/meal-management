import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { JsonWebTokenError } from 'jsonwebtoken';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    private readonly adapterHost: HttpAdapterHost,
    private logger: Logger,
  ) {
    super(adapterHost.httpAdapter);
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let data = null;
    let message =
      exception?.message ||
      exception?.response?.message ||
      exception?.message?.error;

    if (exception?.nativeError?.code === '22P02') {
      statusCode = HttpStatus.BAD_REQUEST;
      message = `${exception.name}: invalid input syntax`;
    }

    if (exception instanceof JsonWebTokenError) {
      statusCode = HttpStatus.FORBIDDEN;
    }

    if (exception.response) {
      message = exception.response.message;
      statusCode =
        exception.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    }

    if (
      exception instanceof SyntaxError ||
      exception instanceof EvalError ||
      exception instanceof RangeError ||
      exception instanceof ReferenceError ||
      exception instanceof TypeError ||
      exception instanceof URIError
    ) {
      statusCode = HttpStatus.BAD_REQUEST;
    }

    this.logger.log(exception);

    response.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }
}
