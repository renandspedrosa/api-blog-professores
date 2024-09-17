import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTablesWithConstraints1725488490452
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar a extensão para UUID
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)

    // Criar tabela de usuários primeiro, pois outras tabelas dependem dela
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "users" (
                "id" SERIAL NOT NULL,
                "username" VARCHAR(255) NOT NULL,
                "password" VARCHAR(255) NOT NULL,
                PRIMARY KEY ("id")
            );
        `)

    // Criar tabela de professores (teachers)
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "teachers" (
                "id" SERIAL NOT NULL,
                "name" VARCHAR(100) NOT NULL,
                "user_id" INTEGER NULL DEFAULT NULL,
                "status" INTEGER NULL DEFAULT 1,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP NULL DEFAULT NULL,
                PRIMARY KEY ("id"),
                UNIQUE ("user_id"),
                CONSTRAINT "FK_teachers_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );
        `)

    // Criar tabela de estudantes (students)
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "students" (
                "id" SERIAL NOT NULL,
                "user_id" INTEGER NOT NULL DEFAULT 0,
                "name" VARCHAR NOT NULL,
                "status" INTEGER NOT NULL DEFAULT 1,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP NULL DEFAULT NULL,
                PRIMARY KEY ("id"),
                CONSTRAINT "FK_students_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );
        `)

    // Criar tabela de subjects
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "subjects" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "name" VARCHAR(255) NOT NULL,
                "status" INTEGER NULL DEFAULT 1,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP NULL DEFAULT NULL,
                PRIMARY KEY ("id")
            );
        `)

    // Criar tabela de posts
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "posts" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "title" VARCHAR(255) NOT NULL,
                "content" TEXT NULL DEFAULT NULL,
                "teacher_id" INTEGER NOT NULL,
                "status" INTEGER NOT NULL DEFAULT 1,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP NULL DEFAULT NULL,
                PRIMARY KEY ("id"),
                CONSTRAINT "FK_posts_teachers" FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );
        `)

    // Criar tabela de comentários (comments)
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "comments" (
                "id" UUID NOT NULL,
                "post_id" UUID NOT NULL,
                "student_id" INTEGER NULL DEFAULT NULL,
                "teacher_id" INTEGER NULL DEFAULT NULL,
                "content" TEXT NOT NULL,
                "status" INTEGER NOT NULL DEFAULT 1,
                "updated_at" TIMESTAMP NULL DEFAULT NULL,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY ("id"),
                CONSTRAINT "FK_comments_posts" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
                CONSTRAINT "FK_comments_students" FOREIGN KEY ("student_id") REFERENCES "students" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
                CONSTRAINT "FK_comments_teachers" FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );
        `)

    // Criar tabela de mídia (media)
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "media" (
                "id" SERIAL NOT NULL,
                "name" VARCHAR NOT NULL,
                "path" VARCHAR NOT NULL,
                "status" INTEGER NOT NULL DEFAULT 1,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP NULL DEFAULT NULL,
                "post_id" UUID NOT NULL,
                PRIMARY KEY ("id"),
                CONSTRAINT "FK_media_posts" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );
        `)

    // Criar tabela de tags
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "tags" (
                "id" SERIAL NOT NULL,
                "name" VARCHAR(255) NOT NULL,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP NULL DEFAULT NULL,
                "status" INTEGER NOT NULL DEFAULT 1,
                PRIMARY KEY ("id")
            );
        `)

    // Criar tabela de posts_tags (relações entre posts e tags)
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "posts_tags" (
                "tag_id" INTEGER NOT NULL,
                "post_id" UUID NOT NULL,
                "status" INTEGER NOT NULL DEFAULT 1,
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP NULL DEFAULT NULL,
                PRIMARY KEY ("id"),
                CONSTRAINT "FK_posts_tags_posts" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
                CONSTRAINT "FK_posts_tags_tags" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );
        `)

    // Criar tabela de post_viewed (visualizações de posts)
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "post_viewed" (
                "id" SERIAL NOT NULL,
                "student_id" INTEGER NOT NULL,
                "post_id" UUID NOT NULL,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY ("id"),
                CONSTRAINT "FK_post_viewed_posts" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );
        `)

    // Criar tabela de teacher_subjects (relações entre professores e subjects)
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "teacher_subjects" (
                "id" SERIAL NOT NULL,
                "teacher_id" INTEGER NULL DEFAULT NULL,
                "status" INTEGER NULL DEFAULT NULL,
                "updated_at" TIMESTAMP NULL DEFAULT NULL,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "subject_id" UUID NULL DEFAULT NULL,
                PRIMARY KEY ("id"),
                CONSTRAINT "FK_teacher_subjects_teachers" FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
                CONSTRAINT "FK_teacher_subjects_subjects" FOREIGN KEY ("subject_id") REFERENCES "subjects" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "teacher_subjects"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "post_viewed"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "posts_tags"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "media"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "comments"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "posts"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "subjects"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "students"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "teachers"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "tags"`)
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`)
  }
}
