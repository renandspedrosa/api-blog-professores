import { ITeacher } from "@/entities/models/teacher.interface";
import { IUser } from "@/entities/models/user.interface";
import { database } from "@/lib/pg/db";
import { IUserRepository } from "@/repositories/user.repository.interface";

export class UserRepository implements IUserRepository {
    public async findByUsername(username: string): Promise<IUser | undefined> {
        const result = await database.clientInstance ?.query<IUser>(
            `SELECT * FROM "users" WHERE "users".username = $1`,
            [username]
        );

        return result ?.rows[0];
    }
    public async create({ username, password }: IUser): Promise<IUser | undefined> {
        const result = await database.clientInstance ?.query<IUser>(
            `INSERT INTO "users" (username, password) VALUES ($1, $2) RETURNING *`,
            [username, password]
        );

        return result ?.rows[0];
    }

    public async findWithTeacher(userId: number): Promise<(IUser & ITeacher) | undefined>{
        const result = await database.clientInstance ?.query(
            `SELECT * FROM "users"
            LEFT JOIN "teachers" ON "users".id = "teachers".user_id
            WHERE "users".id = $1`,
            [userId]
        );

        return result?.rows[0];
    }
}