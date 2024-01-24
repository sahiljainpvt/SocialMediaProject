import { IComment } from "./comment";
import { ICommentLike } from "./commentLike";
import { IFollow } from "./follow";
import { IPost } from "./post";
import { IPostLike } from "./postLike";

export interface IUser{
    id: string;
    userName: string;
    displayUsername: string;
    email: string;
    profilePictureUrl?: string | null;
    profileBackgroundUrl?: string | null;
    dateRegistrated: Date;
    city: string;
    posts: IPost[];
    comments: IComment[];
    postLikes: IPostLike[];
    commentLikes: ICommentLike[];
    followers: IFollow[];
    followedUsers: IFollow[];
}