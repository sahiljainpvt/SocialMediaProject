import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { environment } from 'src/environments/api-environment';
import { FollowingComponent } from '../following/following.component';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  imageUrl: string = this.postService.imagUrl;

  @Input() currentUser: IUser = {
    id: '',
    userName: '',
    displayUsername: '',
    email: '',
    dateRegistrated: new Date,
    city: '',
    posts: [],
    comments: [],
    postLikes: [],
    commentLikes: [],
    followers: [],
    followedUsers: []
    
  }
  @Input() posts: IPost[] = [];
  @Input() post: IPost = {
    id: 0,
    content: '',
    dateCreated: new Date,
    userId: this.currentUser.id,
    comments: [],
    postLikes: [],
    profile: '',
    image: null
  };
  postOwner: IUser = {
    id: '',
    userName: '',
    displayUsername: '',
    email: '',
    profilePictureUrl: '',
    profileBackgroundUrl: '',
    city: '',
    posts: [],
    comments: [],
    postLikes: [],
    commentLikes: [],
    followers: [],
    followedUsers: [],
    dateRegistrated: new Date()
    
  };
  isLikeHovering: boolean = false;
  constructor(private postService: PostService, private userService: UserService, public accountService: AccountService) {}
  ngOnInit(): void {
    this.userService.getById(this.post.userId).subscribe(res => this.postOwner = res)
  }
  isEditing: boolean = false;
  editedContent: string = "";
  toggleEditing() {
    this.editedContent = this.post.content;
    this.isEditing = !this.isEditing;
  }
  savePost() {
    if (this.editedContent.trim() !== '') {
      this.post.content = this.editedContent;
      this.postService.edit(this.post).subscribe();
    }
    this.isEditing = false;
  }
  cancelEditing() {
    this.isEditing = false;
  }
  deletePost() {
    this.posts.splice(this.posts.indexOf(this.post), 1);
    this.postService.delete(this.post.id).subscribe();
  }
}
