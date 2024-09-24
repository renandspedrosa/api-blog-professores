import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterCommentsTable1726544526547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comments"
                                DROP COLUMN "student_id",
                                DROP COLUMN "teacher_id",
                                ADD COLUMN "user_id" INTEGER NULL DEFAULT NULL,
                                ADD CONSTRAINT "FK_comments_users" FOREIGN KEY ("user_id") 
                                REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comments"
                                ADD COLUMN "student_id" INTEGER NULL DEFAULT NULL,
                                ADD COLUMN "teacher_id" INTEGER NULL DEFAULT NULL,
                                DROP COLUMN "user_id",
                                DROP CONSTRAINT "FK_comments_users",
                                ADD CONSTRAINT "FK_comments_students" FOREIGN KEY ("student_id") 
                                REFERENCES "students" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
                                ADD CONSTRAINT "FK_comments_teachers" FOREIGN KEY ("teacher_id") 
                                REFERENCES "teachers" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;`)
  }
}
