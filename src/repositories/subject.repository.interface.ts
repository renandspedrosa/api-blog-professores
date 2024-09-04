import { ISubject } from "@/entities/models/subject.interface";

export interface ISubjectRepository {
    create(subject: ISubject): Promise<ISubject>;
    // update(subject: ISubject): Promise<ISubject>;
    // delete(id: string): Promise<boolean>;
    // findById(id: string): Promise<ISubject | null>;
    // findAll(): Promise<ISubject[]>;
}