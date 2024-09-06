import { makeUpdateSubjectUseCase } from "@/use-cases/factory/make-update-subject";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
    const registerParamsSchema =  z.object({
        id: z.coerce.string()
    });

    const {id} = registerParamsSchema.parse(req.params);

    const registerBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        tags: z.array(
            z.object({
                id: z.coerce.number(),
                name: z.string()
            })
        ).optional()
    });

    const {name, description, image, tags} = registerBodySchema.parse(req.body);

    const updateSubjectUseCase = makeUpdateSubjectUseCase();

    const subject = await updateSubjectUseCase.handler({
        id,
        name,
        description,
        image: image,
        tags: tags || []
    });

    return res.status(200).json(subject);
}