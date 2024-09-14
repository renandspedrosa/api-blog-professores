import { Repository } from "typeorm";
import { appDataSource } from "@/lib/typeorm/typeorm";
import { Teacher } from "@/entities/teacher.entity"; // Certifique-se de que o caminho esteja correto
import { ITeacherRepository } from "@/repositories/teacher.repository.interface";
import { ITeacher } from "@/entities/models/teacher.interface";

export class TeacherRepository implements ITeacherRepository {
    private repository: Repository<Teacher>;

    constructor() {
        this.repository = appDataSource.getRepository(Teacher);
    }

    async create(teacherData: ITeacher): Promise<ITeacher> {
        const teacher = this.repository.create(teacherData);
        return this.repository.save(teacher);
    }
}
