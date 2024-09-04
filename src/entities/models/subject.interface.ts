import { ITag } from "./tags.interface";

export interface ISubject {
    id?: string;
    name: string;
    description: string;
    image_url: string;
    tags?: ITag[];
}