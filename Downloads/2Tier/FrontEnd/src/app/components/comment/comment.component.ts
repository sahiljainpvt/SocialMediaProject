import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/interfaces/comment';
import { IUser } from 'src/app/interfaces/user';
import { AccountService } from 'src/app/services/account.service';
import { CommentLikeService } from 'src/app/services/comment-like.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  commentOwner: IUser = {
    id: '',
    userName: '',
    displayUsername: '',
    email: '',
    profilePictureUrl: '',
    profileBackgroundUrl: '',
    posts: [],
    comments: [],
    postLikes: [],
    commentLikes: [],
    followers: [],
    followedUsers: [],
    dateRegistrated: new Date(),
    city: ''
  };
  isLikeHovering: boolean = false;
  constructor(private commentService: CommentService, private commentLikeService: CommentLikeService, private userService: UserService, private accountService: AccountService) {}
  ngOnInit(): void {
    this.currentUserId = this.accountService.getCurrentUserId()
    this.commentLikeService.getByCommentId(this.comment.id).subscribe(res => this.comment.commentLikes = res);
    this.userService.getById(this.comment.userId).subscribe(res => this.commentOwner = res)
  }
  currentUserId!: string;
  @Input() comments: IComment[] | undefined = [] ;
  @Input() comment: IComment = {
    id: 0,
    content: '',
    dateCreated: new Date,
    userId: '',
    postId: 0,
    commentLikes: [],
  };
  isEditing: boolean = false;
  editedContent: string = "";
  toggleEditing() {
    this.editedContent = this.comment.content;
    this.isEditing = !this.isEditing;
  }
  saveComment() {
    if (this.editedContent.trim() != '') {
      this.comment.content = this.editedContent;
      this.commentService.edit(this.comment).subscribe();
    }
    this.isEditing = false;
  }
  cancelEditing() {
    this.isEditing = false;
  }
  deleteComment() {
    var index = this.comments?.indexOf(this.comment);
    if (index != undefined) {
      this.commentService.delete(this.comment.id).subscribe();;
      this.comments?.splice(index, 1);
    }
  }
}
