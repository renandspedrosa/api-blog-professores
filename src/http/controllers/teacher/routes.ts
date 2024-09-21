import { Router } from 'express'
import { validateCreateTeacher } from '@/http/middlewares/teacher/validation-create-teacher'
import { getAllTeachers } from '@/http/controllers/teacher/get-all-teachers'
import { create } from '@/http/controllers/teacher/create'
import { update } from '@/http/controllers/teacher/update'

const router = Router()

router.get('/', getAllTeachers)
router.post('/', validateCreateTeacher, create)
router.put('/:id', update)

export default router
