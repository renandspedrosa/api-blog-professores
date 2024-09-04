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
    create(subject: ISubject): Promise<ISubject> {
        return this.repository.save(subject);
    }
    // update(subject: ISubject): Promise<ISubject> {
    //     throw new Error("Method not implemented.");
    // }
    // delete(id: string): Promise<boolean> {
    //     throw new Error("Method not implemented.");
    // }
    // findById(id: string): Promise<ISubject | null> {
    //     throw new Error("Method not implemented.");
    // }
    // findAll(): Promise<ISubject[]> {
    //     throw new Error("Method not implemented.");
    // }
}