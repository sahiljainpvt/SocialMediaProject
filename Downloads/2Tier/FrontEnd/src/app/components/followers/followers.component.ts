import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFollow } from 'src/app/interfaces/follow';
import { IUser } from 'src/app/interfaces/user';
import { AccountService } from 'src/app/services/account.service';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent {
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
  currentUserId!: string;
  accountOwnerId!: string;
  accountOwnerUserName!: string;
  isCurrentUserIsOwner: boolean = false;
  followers: IUser[] = [];
  currentUserfollowing: IFollow[] = []
  constructor(private route: ActivatedRoute, private userService: UserService, private followService: FollowService, private accountService: AccountService) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountOwnerUserName = params['userName']
      this.userService.getByUserName(params['userName']).subscribe(res => {
        this.accountOwnerId = res.id
        this.currentUserId = this.accountService.getCurrentUserId()
        if (this.currentUserId == this.accountOwnerId)
          this.isCurrentUserIsOwner = true
        this.userService.getFollowersByUserId(this.accountOwnerId).subscribe(res => this.followers = res)
        this.followService.getByFollowerId(this.currentUserId).subscribe(res => this.currentUserfollowing = res)
      })
    });
  }
  isFollow(userId: string): boolean {
    return this.currentUserfollowing.some(follow => follow.followedUserId == userId);
  }
  isCurrentUser(userId: string): boolean {
    return userId == this.currentUserId;
  }
  toggleFollow(userId: string): void {
    this.userService.getById(userId).subscribe(res => {
      this.unathorizedMessage = `Start reading ${res.displayUsername} to see what he or she shares.`
    })
    this.toggleUnathorizedFollowClick()
    if (this.accountService.isAuthorized()) {
      if (this.isFollow(userId)) {
        const follow = this.currentUserfollowing.find(follow => follow.followerId == this.currentUserId && follow.followedUserId == userId);
        if (follow) {
          this.followService.delete(follow.id).subscribe(res => {
            this.followService.getByFollowerId(this.currentUserId).subscribe(res => this.currentUserfollowing = res)
          });
        }
      }
      else {
        const newFollow: IFollow = {
          id: 0,
          followerId: this.currentUserId,
          followedUserId: userId,
        };
        this.followService.create(newFollow).subscribe(res => {
          this.followService.getByFollowerId(this.currentUserId).subscribe(res => this.currentUserfollowing = res)
        });
      }
    }
  }
}
