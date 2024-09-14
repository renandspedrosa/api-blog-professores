import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';

export function validateCreateTeacher(req: Request, res: Response, next: NextFunction) {
    const registerBodySchema = z.object({
        cpf: z.string(),
        name: z.string(),
        birth: z.coerce.date(),
        email: z.string().email(),
        user_id: z.coerce.number()
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
