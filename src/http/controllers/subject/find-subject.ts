
import { makeFindSubjectUseCase } from "@/use-cases/factory/make-find-subject-use-case";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export async function findSubject(req: Request, res: Response) {
    const registerParamsSchema =  z.object({
        id: z.coerce.string(),
    });

    const { id } = registerParamsSchema.parse(req.body);

    const findSubjectUseCase = makeFindSubjectUseCase();

    const subject = await findSubjectUseCase.handler(id);

    return res.status(200).json(subject);
}