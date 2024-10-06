import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterCommentsIdToUUID1728184531106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "id" TYPE UUID,
            ALTER COLUMN "id" SET NOT NULL,
            ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "id" DROP DEFAULT,
            ALTER COLUMN "id" TYPE INTEGER;
        `)
  }
}
