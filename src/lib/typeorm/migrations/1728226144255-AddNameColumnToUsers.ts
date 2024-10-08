import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddNameColumnToUsers1728226144255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD COLUMN "name" VARCHAR(255) NOT NULL;
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            DROP COLUMN "name";
        `)
  }
}
