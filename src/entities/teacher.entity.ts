import { ITeacher } from "./models/teacher.interface";

export class Teacher implements ITeacher{
    id?: number;
    cpf: string;
    name: string;
    birth: Date;
    email: string;
    user_id?: number;

    constructor(cpf: string, name: string, births: Date, email: string) {
        this.cpf = cpf;
        this.name = name;
        this.birth = births;
        this.email = email;
    }
}
