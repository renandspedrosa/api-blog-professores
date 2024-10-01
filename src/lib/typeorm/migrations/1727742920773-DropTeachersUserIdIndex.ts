import { MigrationInterface, QueryRunner } from 'typeorm'

export class DropTeachersUserIdIndex1727742920773
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "teachers" DROP CONSTRAINT IF EXISTS "teachers_user_id_key";
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE UNIQUE INDEX "teachers_user_id_key" ON "teachers" ("user_id");
        `)
  }
}
