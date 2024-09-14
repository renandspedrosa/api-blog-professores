import { Tag } from "@/entities/tag.entity";
import { ITagRepository } from "../tag.repository.interface";
import { Repository } from "typeorm";
import { appDataSource } from "@/lib/typeorm/typeorm";

export class TagRepository implements ITagRepository {
    private repository: Repository<Tag>;

    constructor(){
        this.repository = appDataSource.getRepository(Tag);
    }
    async create(name: string): Promise<void> {
        await this.repository.save({name});
    }
}