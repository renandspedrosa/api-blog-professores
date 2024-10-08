import { Router } from 'express'
import { getAllTeachers } from '@/http/controllers/teacher/get-all-teachers'
import { create } from '@/http/controllers/teacher/create'
import { deleteTeacher } from './delete'
import { validationFindAll } from '@/http/middlewares/utils/validation-find-all'
import { validateCreateUserWithUniqueEmail } from '@/http/middlewares/user/validation-unique-email'
import { validateCreateTeacher } from '@/http/middlewares/teacher/validation-create-teacher'

const router = Router()

router.get('/', validationFindAll, getAllTeachers)
router.post(
  '/',
  validateCreateUserWithUniqueEmail,
  validateCreateTeacher,
  create,
)
router.delete('/:id', deleteTeacher)

export default router
