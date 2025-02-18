import { In, MigrationInterface, QueryRunner } from 'typeorm'
import { Tag } from '@/entities/tag.entity'

export class TagPadrao1738929340955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tagRepository = queryRunner.manager.getRepository(Tag)

    const tags = [
      'Dicas',
      'Projetos',
      'Novidades',
      'Programação',
      'Inovações',
      'Resumos',
      'IA',
    ].map((name) => tagRepository.create({ name }))

    await tagRepository.save(tags)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tagRepository = queryRunner.manager.getRepository(Tag)

    await tagRepository.delete({
      name: In([
        'Dicas',
        'Projetos',
        'Novidades',
        'Programação',
        'Inovações',
        'Resumos',
        'IA',
      ]),
    })
  }
}
