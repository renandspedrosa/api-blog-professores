import { Router } from 'express'
import { validateCreateTeacher } from '@/http/middlewares/teacher/validation-create-teacher'
import { getAllTeachers } from '@/http/controllers/teacher/get-all-teachers'
import { create } from '@/http/controllers/teacher/create'
import { update } from '@/http/controllers/teacher/update'
import { deleteTeacher } from './delete'
import { validationFindAll } from '@/http/middlewares/utils/validation-find-all'
import { validateCreateUserWithUniqueEmail } from '@/http/middlewares/user/validation-unique-email'

const router = Router()

router.get('/', validationFindAll, getAllTeachers)
router.post(
  '/',
  validateCreateUserWithUniqueEmail,
  validateCreateTeacher,
  create,
)
router.put('/:id', update)
router.delete('/:id', deleteTeacher)

export default router
