import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'SocialNetworkAngular';
  currentComponent: string = 'app';
  showComponent(component: string): void {
    this.currentComponent = component;
  }
}
