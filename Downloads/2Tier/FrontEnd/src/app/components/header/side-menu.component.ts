import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
userservices: any;
  constructor(private userService: UserService, public accountService: AccountService, private location: Location) {}
  ngOnInit(): void {
    
    this.currentUserId = this.accountService.getCurrentUserId()
    if (this.currentUserId != undefined)
      this.userService.getById(this.currentUserId).subscribe(res => this.currentUser = res)
  }
  logout(): void {
    this.accountService.logout().subscribe(res => {
      this.accountService.clearToken();
      this.accountService.clearCurrentUserId();
      this.location.go(this.location.path());
      window.location.reload();
    })
  }
  currentUserId: string = ''
  currentUser: IUser = {
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
}
