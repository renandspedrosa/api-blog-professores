import { DataSource } from "typeorm";
import { env } from "@/env";
import { CreateTablesWithConstraints1725488490452 } from "./migrations/1725488490452-CreateTablesWithConstraints";
import { Subject } from "@/entities/subject.entity";
import { Tag } from "@/entities/tag.entity";
import { User } from "@/entities/user.entity";
import { Teacher } from "@/entities/teacher.entity";

export const appDataSource = new DataSource({
    type: 'postgres',
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    // entities: ['src/entities/**/*.entity.ts'],
    entities: [Subject,Tag,User,Teacher],
    migrations: [CreateTablesWithConstraints1725488490452],
    logging: env.NODE_ENV === 'development'
})

appDataSource
    .initialize()
    .then(() => {
        console.log('Database with typeorm connected');
    })
    .catch((error) => {
        console.error(`Error connecting typeorm to the database: ${error}`);
    });