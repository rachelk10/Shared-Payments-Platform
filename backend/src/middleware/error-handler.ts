// backend/src/middleware/error-handler.ts
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  status: string;
  isOperational: boolean;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production error response
    res.status(err.statusCode).json({
      status: err.status,
      message: err.isOperational ? err.message : 'Internal server error',
    });
  }
};