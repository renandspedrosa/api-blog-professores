import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterTableUsersToUniqueUsername1726795708879
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_username" UNIQUE ("username")`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_username"`)
  }
}
