import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';

export function validateCreatePost(req: Request, res: Response, next: NextFunction) {
    const registerBodySchema = z.object({
        title: z.string(),
        content: z.string(),
        state: z.coerce.string(),
        teacher_id: z.coerce.number()
    });

    try {
        req.body = registerBodySchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.format(),
            });
        }

        next(error);
    }
}
