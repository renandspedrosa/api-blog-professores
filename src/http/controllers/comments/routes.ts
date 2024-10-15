import { Router } from 'express'
import { create } from './create'
import { getById } from './get-by-Id'
import { update } from './update'
import { deleteComment } from './delete-comment'
import { validateCreateComment } from '@/http/middlewares/comments/validation-create-comment'
import { validateResponsibleComment } from '@/http/middlewares/comments/validation-responsible-comment'
import { validateDeleteComment } from '@/http/middlewares/comments/validation-delete-comment'

const router = Router()

/**
 * @swagger
 * /comments/{post_id}:
 *   post:
 *     summary: Cria um comentário em um post
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post onde o comentário será adicionado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Este é um comentário interessante."
 *                 description: Conteúdo do comentário
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 */

router.post('/:post_id', validateCreateComment, create)

/**
 * @swagger
 * /comments/{comment_id}:
 *   get:
 *     summary: Retorna um comentário específico pelo ID
 *     description: Busca e retorna um comentário específico identificado pelo `comment_id` fornecido.
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: O ID do comentário a ser recuperado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: O comentário correspondente ao ID especificado.
 */

router.get('/:id', getById)

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Atualiza um comentário específico
 *     description: Atualiza o conteúdo de um comentário identificado pelo `id` fornecido.
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID do comentário a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 content:
 *                   type: string
 *                   description: O novo conteúdo do comentário.
 *                   example: "Este é um comentário atualizado."
 *     responses:
 *       200:
 *         description: O comentário foi atualizado com sucesso.
 */

router.put('/:id', validateResponsibleComment, update)

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Deleta um comentário específico
 *     description: Remove um comentário identificado pelo `id` fornecido.
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID do comentário a ser removido.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Comentário deletado com sucesso.
 */

router.delete('/:id', validateDeleteComment, deleteComment)

export default router
