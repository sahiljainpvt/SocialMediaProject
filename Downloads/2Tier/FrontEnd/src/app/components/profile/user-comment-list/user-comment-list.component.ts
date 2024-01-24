import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-comment-list',
  templateUrl: './user-comment-list.component.html',
  styleUrls: ['./user-comment-list.component.scss']
})
export class UserCommentListComponent implements OnInit{
  constructor(private commentService: CommentService, private route: ActivatedRoute, private userService: UserService) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userService.getByUserName(params['userName']).subscribe(res => {
        this.commentService.getByUserId(res.id).subscribe(res => this.comments = res)
      })
    });
  }
  comments: IComment[] = [];
  @Input() currentUserId: string = ''
}
