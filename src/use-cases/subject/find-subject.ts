import { ISubjectRepository } from "@/repositories/subject.repository.interface";

export class FindSubjectUseCase {
    constructor(private subjectRepository: ISubjectRepository) {}

    async handler(id: string) {
        console.log(`Finding subject with ID: ${id}`);
        const subject = await this.subjectRepository.findById(id);
        if (!subject) { 
            console.error(`Subject with ID ${id} not found`);
            throw new Error('Subject not found');
        }
        return subject;
    }
}