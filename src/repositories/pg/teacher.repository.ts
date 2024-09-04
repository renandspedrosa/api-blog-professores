import { ITeacher } from "@/entities/models/teacher.interface";
import { database } from "@/lib/pg/db";
import { ITeacherRepository } from "@/repositories/teacher.repository.interface";

export class TeacherRepository implements ITeacherRepository {
    async create({cpf, name, birth, email, user_id}: ITeacher): Promise<ITeacher | undefined> {
        const result = await database.clientInstance ?.query(
            'INSERT INTO teachers (cpf, name, birth, email, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [cpf, name, birth, email, user_id]
        );

        return result?.rows[0];
    }
}