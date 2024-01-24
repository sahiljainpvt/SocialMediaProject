import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFollow } from 'src/app/interfaces/follow';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';
import { FollowService } from 'src/app/services/follow.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent {
  isCurrentUserIsOwner!: boolean;
  currentUserId!: string;
  currentUser!: IUser;
  accountOwnerId!: string;
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
  unathorizedMessage!: string;
  isUnathorizedFollowClicked: boolean = false;
  toggleUnathorizedFollowClick() {
    if (!this.accountService.isAuthorized()) {
      if (this.isUnathorizedFollowClicked) {
        document.body.style.overflow = 'auto';
        document.body.style.marginRight = '0'
        this.isUnathorizedFollowClicked = false;
      }
      else {
        document.body.style.marginRight = '15px'
        document.body.style.overflow = 'hidden';
        this.isUnathorizedFollowClicked = true
      }
    }
  }
  showUserPosts!: boolean;
  showUserComments!: boolean;
  isEditing: boolean = false;
  isFollowed: boolean = false;
  followers: IFollow[] = [];
  following: IFollow[] = [];
  constructor(private accountService: AccountService, private fb: FormBuilder, private navigation: NavigationService, private route: ActivatedRoute, private userService: UserService, private followService: FollowService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getByUserName(params['userName']).subscribe(res => {
        this.accountOwnerId = res.id
        this.unathorizedMessage = `Start reading ${res.displayUsername} to see what he or she shares.`
        this.currentUserId = this.accountService.getCurrentUserId()
        if (this.accountService.getCurrentUserId() != undefined) [
          this.userService.getById(this.currentUserId).subscribe(res => {
            this.currentUser = res
            this.userChangesForm.get("displayUsername")?.setValue(this.currentUser.displayUsername);
            this.userChangesForm.get("profilePictureUrl")?.setValue(this.currentUser.profilePictureUrl || '');
            this.userChangesForm.get("profileBackgroundUrl")?.setValue(this.currentUser.profileBackgroundUrl || '');
          })
        ]
        if (this.currentUserId == this.accountOwnerId) {
          this.isCurrentUserIsOwner = true;
        }
        else {
          this.isCurrentUserIsOwner = false
        }
        this.userService.getById(this.accountOwnerId).subscribe(res => this.accountOwner = res)
        this.followService.getByFollowedUserId(this.accountOwnerId).subscribe(res => { 
          this.followers = res;
          if (!this.isCurrentUserIsOwner) {
            this.isFollowed = this.followers.some(followers => followers.followerId == this.currentUserId);
          }
        })
        this.followService.getByFollowerId(this.accountOwnerId).subscribe(res => this.following = res )
        this.showPosts()
      })
    });
  }
  goBack() {
    this.navigation.back()
  }
  toggleEditing() {
    this.isEditing = !this.isEditing
  }
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
  userChangesForm = this.fb.group({
    displayUsername: [''],
    profilePictureUrl: '',
    profileBackgroundUrl: '',
  });
  saveChanges() {
    const displayUsername = this.userChangesForm.value.displayUsername
    const profilePictureUrl = this.userChangesForm.value.profilePictureUrl
    const profileBackgroundUrl = this.userChangesForm.value.profileBackgroundUrl
    if (displayUsername != null) {
      this.accountOwner.displayUsername = displayUsername;
      if (profilePictureUrl != null && profilePictureUrl != undefined && profilePictureUrl == '') {
        this.accountOwner.profilePictureUrl = null;
      } 
      else {
        this.accountOwner.profilePictureUrl = profilePictureUrl;
      }
      if (profileBackgroundUrl != null && profileBackgroundUrl != undefined && profileBackgroundUrl == '') {
        this.accountOwner.profileBackgroundUrl = null;
      } 
      else {
        this.accountOwner.profileBackgroundUrl = profileBackgroundUrl;
      }
      this.userService.edit(this.accountOwner).subscribe()
      this.toggleEditing()
    }
  }
  toggleFollow(): void {
    this.toggleUnathorizedFollowClick();
    if (this.accountService.isAuthorized()) {
      if (this.isFollowed) {
        const follow = this.followers.find(follow => follow.followerId == this.currentUserId);
        if (follow) {
          this.followService.delete(follow.id).subscribe(res => {
            this.followService.getByFollowedUserId(this.accountOwnerId).subscribe(res => { this.followers = res })
          });
        }
      }
      else {
        const newFollow: IFollow = {
          id: 0,
          followerId: this.currentUserId,
          followedUserId: this.accountOwnerId,
        };
        this.followService.create(newFollow).subscribe(res => {
          this.followers.push(res);
          this.followService.getByFollowedUserId(this.accountOwnerId).subscribe(res => { this.followers = res })
        });
      }
      this.isFollowed = !this.isFollowed;
    }
  }
  showPosts(): void {
    this.showUserPosts = true;
    this.showUserComments = false;
  }
  showComments(): void {
    this.showUserPosts = false;
    this.showUserComments = true;
  }
}
