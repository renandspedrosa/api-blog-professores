import { ISubject } from "@/entities/models/subject.interface";
import { ISubjectRepository } from "../subject.repository.interface";
import { Repository } from "typeorm";
import { Subject } from "@/entities/subject.entity";
import { appDataSource } from "@/lib/typeorm/typeorm";

export class SubjectRepository implements ISubjectRepository {
   private repository: Repository<Subject>;

    constructor(){
        this.repository = appDataSource.getRepository(Subject);
    }
    async findAll(page: number, limit: number ): Promise<ISubject[]> {
        return this.repository.find({
            relations: ['tags'],
            skip:(page - 1) * limit,
            take: limit
        });
    }
    async findById(id: string): Promise<ISubject | null> {
        return this.repository.findOne({
            relations: ['tags'],
            where: {id}
        });
    }
    async create(subject: ISubject): Promise<ISubject> {
        return this.repository.save(subject);
    }
    async update(subject: ISubject): Promise<ISubject> {
        return this.repository.save(subject);
    }
    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}