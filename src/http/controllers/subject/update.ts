import { makeUpdateSubjectUseCase } from '@/use-cases/factory/subject/make-update-subject'
import { Request, Response } from 'express'

export async function update(req: Request, res: Response) {
  const { id } = req.params
  // const { name, tags  } = req.body;
  const { name } = req.body

  const updateSubjectUseCase = makeUpdateSubjectUseCase()

  const subject = await updateSubjectUseCase.handler({
    id,
    name,
    // tags: tags || []
  })

  return res.status(200).json({ id: subject.id, name: subject.name })
}
