import { makeDeleteSubjectUseCase } from "@/use-cases/factory/make-delete-subject";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";


export async function deleteSubject(req: Request, res: Response) {
    const registerParamsSchema =  z.object({
        id: z.coerce.string()
    });

    const {id} = registerParamsSchema.parse(req.params);

    const deleteSubjectUseCase = makeDeleteSubjectUseCase();

    await deleteSubjectUseCase.handler(id);

    return res.status(204).send();
}