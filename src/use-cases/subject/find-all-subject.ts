import { ISubjectRepository } from "@/repositories/subject.repository.interface";

export class FindAllSubjectUseCase {
    constructor(private subjectRepository: ISubjectRepository) {}

    async handler(page: number, limit: number) {
        return this.subjectRepository.findAll(page, limit);
    }
}