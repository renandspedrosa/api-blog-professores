import { Router } from 'express'
import { create } from './create'
import { update } from './update'
import { validateCreateTag } from '@/http/middlewares/tag/validation-create-tag'
import { isTeacher } from '@/http/middlewares/teacher/is-teacher'
import { validationFindAll } from '@/http/middlewares/utils/validation-find-all'
import { findAllTag } from './find-all-tag'
import { deleteTag } from './delete'
import { validationFindTag } from '@/http/middlewares/tag/validation-find-tag'
import { validateJwt } from '@/http/middlewares/jwt-validate'

const router = Router()

/**
 * @swagger
 * /tag:
 *   get:
 *     summary: Recupera todos os assuntos
 *     tags:
 *       - Tag
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

router.get('/', validationFindAll, findAllTag)

/**
 * @swagger
 * /tag:
 *   post:
 *     summary: Cria uma nova tag
 *     tags:
 *       - Tag
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
 *                 description: Nome da tag
 *                 example: "Nova Tag"
 *     responses:
 *       201:
 *         description: Tag criada com sucesso
 */
router.post('/', validateJwt, isTeacher, validateCreateTag, create)

/**
 * @swagger
 * /tag/{id}:
 *   put:
 *     summary: Atualiza uma tag existente
 *     tags:
 *       - Tag
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tag a ser atualizada
 *         schema:
 *           type: integer
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
 *                 description: Novo nome da tag
 *                 example: "Tag Atualizada"
 *     responses:
 *       200:
 *         description: Tag atualizada com sucesso
 */

router.put('/:id', validateJwt, isTeacher, validateCreateTag, update)

/**
 * @swagger
 * /tag/{id}:
 *   delete:
 *     summary: Remove um assunto pelo ID
 *     tags:
 *       - Tag
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

router.delete('/:id', validateJwt, isTeacher, validationFindTag, deleteTag)

export default router
