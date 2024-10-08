import { MigrationInterface, QueryRunner } from 'typeorm'

export class DropNameColumnFromStudents1728226454832
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "students"
            DROP COLUMN "name";
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "students"
            ADD COLUMN "name" VARCHAR(255) NOT NULL;
        `)
  }
}
