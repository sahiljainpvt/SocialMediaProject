import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginRequest } from 'src/app/interfaces/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  errorMessage = '';

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {}

  login(): void {
    if (this.loginForm.invalid) {
      // Mark all fields as touched to display error messages
      this.loginForm.markAllAsTouched();
      return;
    }

    const request = this.loginForm.value as ILoginRequest;

    this.accountService.login(request).subscribe(
      (res) => {
        this.accountService.saveToken(res.token);
        this.accountService.setCurrentUserId(res.userId);
        this.router.navigate(['']);
      },
      (error) => {
        if (error.status === 401) {
          // Unauthorized: Incorrect username or password
          this.errorMessage = 'Incorrect username or password';
        } else {
          // Handle other login errors
          console.error('Login error:', error);
          this.errorMessage = 'Incorrect UserName or Password';
        }
      }
    );
  }
}
