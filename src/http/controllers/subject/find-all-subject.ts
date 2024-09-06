import { makeFindAllSubjectUseCase } from "@/use-cases/factory/make-find-all-subject-use-case";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export function findAllSubject(req: Request, res: Response){
    const registerParamsSchema =  z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10),
    });

    const { page, limit } = registerParamsSchema.parse(req.body);

    const findAllSubjectUseCase = makeFindAllSubjectUseCase();

    const subjects = findAllSubjectUseCase.handler(page, limit);

    return res.status(200).json(subjects);
}