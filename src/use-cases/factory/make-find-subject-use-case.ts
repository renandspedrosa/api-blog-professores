import { SubjectRepository } from "@/repositories/typeorm/subject.repository";
import { FindSubjectUseCase } from "../find-subject";

export function makeFindSubjectUseCase() {
    const subjectRepository = new SubjectRepository();
    return new FindSubjectUseCase(subjectRepository);
}