import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterTableUsersToChangeUsernameToEmail1727228921260
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN username TO email`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN email TO username`,
    )
  }
}
