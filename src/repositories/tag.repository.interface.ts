import { ISubject } from "@/entities/models/subject.interface";

export interface ITagRepository {
    create(name:string, subject?: ISubject[]): Promise<void>;
}