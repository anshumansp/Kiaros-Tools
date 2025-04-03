import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export abstract class BaseController {
  protected handleError(res: Response, error: any) {
    console.error('Error:', error);
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    res.status(status).json({ status: 'error', message });
  }

  protected validate(req: Request, res: Response): boolean {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
      return false;
    }
    return true;
  }

  protected success(res: Response, data: any, message: string = 'Success') {
    res.json({
      status: 'success',
      message,
      data,
    });
  }

  protected async handleRequest(
    req: Request,
    res: Response,
    action: () => Promise<any>
  ) {
    try {
      if (!this.validate(req, res)) return;
      const result = await action();
      this.success(res, result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  protected abstract validateRequest(req: Request): Promise<boolean>;
  protected abstract executeRequest(req: Request): Promise<any>;
} 