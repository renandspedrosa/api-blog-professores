import { SubjectRepository } from "@/repositories/typeorm/subject.repository";
import { DeleteSubjectUseCase } from "../delete-subject";

export function makeDeleteSubjectUseCase() {
    const subjectRepository = new SubjectRepository();
    return new DeleteSubjectUseCase(subjectRepository);
}