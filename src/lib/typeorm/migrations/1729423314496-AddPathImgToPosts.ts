import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddPathImgToPosts1729423314496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'posts',
      new TableColumn({
        name: 'path_img',
        type: 'text',
        isNullable: true, // Definir como opcional se necessário
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('posts', 'path_img')
  }
}
