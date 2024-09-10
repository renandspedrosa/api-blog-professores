import { makeFindAllSubjectUseCase } from "@/use-cases/factory/make-find-all-subject-use-case";
import { Request, Response } from "express";

export async function findAllSubject(req: Request, res: Response){
    const { page, limit } = req.body;
    
    const findAllSubjectUseCase = makeFindAllSubjectUseCase();

    const subjects = await findAllSubjectUseCase.handler(page, limit);

    return res.status(200).json(subjects);
}