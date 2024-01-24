
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { User } from './components/model/user.model';
import { UsersComponent } from './components/users/users.component';
import { PostComponent } from './components/post/post.component';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingComponent } from './components/following/following.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostListComponent } from './components/post-list/post-list.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component:  LoginComponent},
  { path: 'register', component:  RegisterComponent},
  {path:'users',component:UsersComponent},
  { path: 'profile/:userName/following', component:  FollowingComponent},
  { path: 'profile/:userName/followers', component:  FollowersComponent},
  { path: 'profile/:userName', component: ProfileComponent }
];

@NgModule({
  imports: [  RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
