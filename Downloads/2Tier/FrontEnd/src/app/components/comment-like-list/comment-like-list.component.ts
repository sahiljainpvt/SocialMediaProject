import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment-like-list',
  templateUrl: './comment-like-list.component.html',
  styleUrls: ['./comment-like-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms linear', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CommentLikeListComponent {
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getLikedUsersByCommentId(this.commentId).subscribe(res => {
      this.likedUsers = res
      this.likedUsers = this.likedUsers.splice(0, 3)
    })
  }
  likedUsers!: IUser[];
  @Input()
  commentId!: number;
  @Input()
  currentUserId!: string;
}
