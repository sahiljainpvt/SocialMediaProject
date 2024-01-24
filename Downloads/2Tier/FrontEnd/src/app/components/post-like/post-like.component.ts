import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IPost } from 'src/app/interfaces/post';
import { IPostLike } from 'src/app/interfaces/postLike';
import { AccountService } from 'src/app/services/account.service';
import { PostLikeService } from 'src/app/services/post-like.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-like',
  templateUrl: './post-like.component.html',
  styleUrls: ['./post-like.component.scss']
})
export class PostLikeComponent implements OnInit {
  @Input() post!: IPost;
  currentUserId!: string;
  liked = false;
  unathorizedMessage: string = "Like the post to make the author happy."
  isUnathorizedLikeClicked: boolean = false;
  toggleUnathorizedLikeClick() {
    if (!this.accountService.isAuthorized()) {
      if (this.isUnathorizedLikeClicked) {
        document.body.style.overflow = 'auto';
        document.body.style.marginRight = '0'
        this.isUnathorizedLikeClicked = false;
      }
      else {
        document.body.style.marginRight = '15px'
        document.body.style.overflow = 'hidden';
        this.isUnathorizedLikeClicked = true
      }
    }
  }

  constructor(private postLikeService: PostLikeService,private userService: UserService, private accountService: AccountService) {}
  ngOnInit(): void {
    document.body.style.overflow = 'auto';
    document.body.style.marginRight = '0'
    this.currentUserId = this.accountService.getCurrentUserId()
    this.postLikeService.getByPostId(this.post.id).subscribe(res => {
      const existingLikeIndex = res.findIndex(like => like.userId == this.currentUserId);
      if(existingLikeIndex != undefined && existingLikeIndex >= 0)
        this.liked = true;
    }); 
  }

  toggleLike() {
    this.toggleUnathorizedLikeClick();
    if (this.accountService.isAuthorized()) {
      this.liked = !this.liked;
      const existingLikeIndex = this.post?.postLikes?.findIndex(like => like.userId == this.currentUserId);
      if (existingLikeIndex != undefined && existingLikeIndex >= 0) {
        const existingLikeId = this.post?.postLikes?.[existingLikeIndex]?.id ?? 0;
        this.postLikeService.delete(existingLikeId).subscribe();
        this.post?.postLikes?.splice(existingLikeIndex, 1);
      }
      else {
        const newLike: IPostLike = {
          id: 0,
          userId: this.currentUserId,
          postId: this.post?.id || 0
        };
        this.postLikeService.create(newLike).subscribe(res => {
          this.postLikeService.getByPostId(this.post.id).subscribe(res => this.post.postLikes = res)
        })
      }
    }
  }
}
