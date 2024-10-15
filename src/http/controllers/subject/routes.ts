import { Router } from 'express'
import { create } from './create'
import { validateCreateSubject } from '@/http/middlewares/subject/validation-create-subject'
import { findAllSubject } from './find-all-subject'
import { findSubject } from './find-subject'
import { update } from './update'
import { deleteSubject } from './delete'
import { validationFindAll } from '@/http/middlewares/utils/validation-find-all'
import { validationFindSubject } from '@/http/middlewares/subject/validation-find-subject'
import { isTeacher } from '@/http/middlewares/teacher/is-teacher'

const router = Router()

/**
 * @swagger
 * /subject:
 *   post:
 *     summary: Cria um novo assunto
 *     tags:
 *       - Subject
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do assunto
 *                 example: "Matemática"
 *     responses:
 *       201:
 *         description: Assunto criado com sucesso
 */

router.post('/', isTeacher, validateCreateSubject, create)

/**
 * @swagger
 * /subject:
 *   get:
 *     summary: Recupera todos os assuntos
 *     tags:
 *       - Subject
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número da página para paginar os resultados
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Número máximo de assuntos a serem retornados por página
 *     responses:
 *       200:
 *         description: Lista de assuntos recuperados com sucesso
 */

router.get('/', validationFindAll, findAllSubject)

/**
 * @swagger
 * /subject/{id}:
 *   get:
 *     summary: Recupera um assunto pelo ID
 *     tags:
 *       - Subject
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do assunto a ser recuperado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assunto recuperado com sucesso
 */

router.get('/:id', validationFindSubject, findSubject)

/**
 * @swagger
 * /subject/{id}:
 *   put:
 *     summary: Atualiza um assunto pelo ID
 *     tags:
 *       - Subject
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do assunto a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Novo nome do assunto
 *                 example: "Matemática Avançada"
 *     responses:
 *       200:
 *         description: Assunto atualizado com sucesso
 */

router.put(
  '/:id',
  isTeacher,
  validationFindSubject,
  validateCreateSubject,
  update,
)

/**
 * @swagger
 * /subject/{id}:
 *   delete:
 *     summary: Remove um assunto pelo ID
 *     tags:
 *       - Subject
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do assunto a ser removido
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Assunto removido com sucesso
 */

router.delete('/:id', isTeacher, validationFindSubject, deleteSubject)

export default router
