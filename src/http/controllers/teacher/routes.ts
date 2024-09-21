import { Router } from 'express'
import { validateCreateTeacher } from '@/http/middlewares/teacher/validation-create-teacher'
import { create } from '@/http/controllers/teacher/create'
import { update } from '@/http/controllers/teacher/update'

const router = Router()

router.post('/', validateCreateTeacher, create)
router.put('/:id', update)

export default router
