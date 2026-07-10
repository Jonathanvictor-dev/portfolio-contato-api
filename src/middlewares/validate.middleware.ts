import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

type RequestPart = 'body' | 'params';

export function validate(schema: z.ZodType, part: RequestPart = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      const missingFields = errors
        .filter((error) => error.message.includes('obrigat'))
        .map((error) => error.field);

      res.status(400).json({
        message:
          missingFields.length > 0
            ? `Campos obrigat\u00f3rios ausentes: ${missingFields.join(', ')}`
            : 'Dados inv\u00e1lidos',
        errors,
      });
      return;
    }

    if (part === 'body') {
      req.body = result.data;
    } else {
      req.params = result.data as Record<string, string>;
    }

    next();
  };
}
