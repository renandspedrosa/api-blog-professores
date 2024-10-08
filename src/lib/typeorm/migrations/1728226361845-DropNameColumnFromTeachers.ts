import { MigrationInterface, QueryRunner } from 'typeorm'

export class DropNameColumnFromTeachers1728226361845
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "teachers"
            DROP COLUMN "name";
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "teachers"
            ADD COLUMN "name" VARCHAR(255) NOT NULL;
        `)
  }
}
