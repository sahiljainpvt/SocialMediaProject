import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService, private accountService: AccountService) {}
  ngOnInit(): void {
    if (this.accountService.getCurrentUserId() != undefined)
      this.userService.getById(this.accountService.getCurrentUserId()).subscribe(res => this.currentUser = res);
  }
  currentUser: IUser = {
    id: '',
    userName: '',
    displayUsername: '',
    email: '',
    profilePictureUrl: '',
    profileBackgroundUrl: '',
    dateRegistrated: new Date(),
    city: '',
    posts: [],
    comments: [],
    postLikes: [],
    commentLikes: [],
    followers: [],
    followedUsers: []
  };
}
