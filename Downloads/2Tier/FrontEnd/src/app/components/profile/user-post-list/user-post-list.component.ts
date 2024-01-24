import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/interfaces/post';
import { IUser } from 'src/app/interfaces/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.scss']
})
export class UserPostListComponent implements OnInit {
  constructor(private postService: PostService, private userService: UserService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userService.getByUserName(params['userName']).subscribe(res => {
        this.postService.getByUserId(res.id).subscribe(res => this.posts = res)
      })
    });
  }
  @Input()
  currentUser!: IUser;
  @Input() posts: IPost[] = [];
}
