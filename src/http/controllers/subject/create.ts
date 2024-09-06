import { makeCreateSubjectUseCase } from "@/use-cases/factory/make-create-subject-use-case";
import { Request, Response, NextFunction } from "express";


export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, description, image, tags  } = req.body;

        const createSubjectUseCase = makeCreateSubjectUseCase();
        const subject = await createSubjectUseCase.handler({ name, description, image, tags });

        return res.status(201).json(subject);
    } catch (error) {
        next(error);
    }
}