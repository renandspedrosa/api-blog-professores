import { IPost } from "./models/post.interface";

export class Post implements IPost {
    id?: number;
    title: string;
    content: string;
    state: string;
    teacher_id?: number;

    constructor(title: string, content: string, state: string, teacher_id: number) {
        this.title = title;
        this.content = content;
        this.state = state;
        this.teacher_id = teacher_id;
    }
}