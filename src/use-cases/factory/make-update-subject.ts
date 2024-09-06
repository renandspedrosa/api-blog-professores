import { SubjectRepository } from "@/repositories/typeorm/subject.repository";
import { UpdateSubjectUseCase } from "../update-subject";

export function makeUpdateSubjectUseCase() {
    const subjectRepository = new SubjectRepository();
    return new UpdateSubjectUseCase(subjectRepository);
}