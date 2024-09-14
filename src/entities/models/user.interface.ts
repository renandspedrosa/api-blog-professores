import { ITeacher } from "./teacher.interface";

export interface IUser {
    id?: number;
    username: string;
    password: string;
    teachers?: ITeacher[];
}