import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdatePostsColumns1729717659262 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'posts',
      'content',
      new TableColumn({
        name: 'content',
        type: 'text',
        isNullable: true,
        default: "''",
      }),
    )

    // Alterar a coluna "path_img"
    await queryRunner.changeColumn(
      'posts',
      'path_img',
      new TableColumn({
        name: 'path_img',
        type: 'varchar',
        isNullable: true,
        default: "''",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'posts',
      'content',
      new TableColumn({
        name: 'content',
        type: 'varchar',
        isNullable: false,
        default: undefined,
      }),
    )

    await queryRunner.changeColumn(
      'posts',
      'path_img',
      new TableColumn({
        name: 'path_img',
        type: 'varchar',
        isNullable: false,
        default: undefined,
      }),
    )
  }
}
