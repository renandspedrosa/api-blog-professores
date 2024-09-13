// import { ITag } from "./tags.interface";

export interface ISubject {
    id?: string; 
    name: string;
    status?: number; 
    created_at?: Date;
    updated_at?: Date | null;
    // tags?: ITag[];
}