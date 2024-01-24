import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/user';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { FollowService } from 'src/app/services/follow.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  accountOwner: IUser = {
    id: '',
    userName: '',
    displayUsername: '',
    email: '',
    dateRegistrated: new Date,
    posts: [],
    comments: [],
    postLikes: [],
    commentLikes: [],
    followers: [],
    followedUsers: [],
    city: ''
  };
  users!: User[];
  searchTerm = '';
  cityTerm = '';
  constructor(private accountService: AccountService, private fb: FormBuilder, private navigation: NavigationService, private route: ActivatedRoute, private userService: UserService, private followService: FollowService) { }
  ngOnInit() {
    this.getUsers();
  }
  
  getUsers(){
    this.userService.getAll()
    .subscribe({
      next:(res=>{
        this.users = res
      })
    })
  }
  todate(){
    
  }
  search(): void {
    if (this.searchTerm.trim() !== '' || this.searchTerm.toUpperCase()) {
      this.userService.getByUserName(this.searchTerm).subscribe(
        (user) => {
          this.users = [user];
        },
        (error) => {
          console.error('Error searching for user:', error);
          // Handle the error, e.g., show a message to the user
        }
      );
    }
    else
    {this.users;}
  }
  searchCity(): void {
    if (this.cityTerm.trim() !== '' || this.cityTerm.toUpperCase()) {
      this.userService.getByCity(this.cityTerm).subscribe(
        (users) => {
          this.users = users;
        },
        (error) => {
          console.error('Error searching for city:', error);
          // Handle the error, e.g., show a message to the user
        }
      );
    }
    else
    {
      this.users;
    }
  }
}
