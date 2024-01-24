import { ICommentLike } from "./commentLike";

export interface IComment {
    id: number;
    content: string;
    dateCreated: Date;
    userId: string;
    postId: number;
    commentLikes?: ICommentLike[];
}