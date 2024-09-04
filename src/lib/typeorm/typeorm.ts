import { DataSource } from "typeorm";
import { env } from "@/env";
import { SubjectAutoGenerateUUID1725488490452 } from "./migrations/1725488490452-SubjectAutoGenerateUUID";

export const appDataSource = new DataSource({
    type: 'postgres',
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    entities: ['src/entities/**/*.entity.ts'],
    migrations: [SubjectAutoGenerateUUID1725488490452],
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