import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterTeacherSubjectsStatusColumnMigration1728432062988
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'teacher_subjects',
      'status',
      new TableColumn({
        name: 'status',
        type: 'int',
        isNullable: false,
        default: 1,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'teacher_subjects',
      'status',
      new TableColumn({
        name: 'status',
        type: 'int',
        isNullable: true,
        default: null,
      }),
    )
  }
}
