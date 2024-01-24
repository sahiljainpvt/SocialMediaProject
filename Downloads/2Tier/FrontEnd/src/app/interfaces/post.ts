import { IComment } from "./comment";
import { IPostLike } from "./postLike";

export interface IPost {
    id: number;
    content: string;
    dateCreated: Date;
    userId: string;  
    profile: string;
    image:File | null;
    comments?: IComment[];
    postLikes?: IPostLike[];
}
