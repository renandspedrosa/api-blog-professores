import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterTablePostViewedStudentIdToUserId1728356105658
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "post_viewed"
                RENAME COLUMN "student_id" TO "user_id"
            `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "post_viewed"
                RENAME COLUMN "user_id" TO "student_id"
            `)
  }
}
