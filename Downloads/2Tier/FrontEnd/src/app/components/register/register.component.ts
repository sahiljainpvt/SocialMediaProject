import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterRequest } from 'src/app/interfaces/account';
import { ILoginRequest } from 'src/app/interfaces/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    displayUsername: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, this.emailValidator]],
    password: ['', Validators.required],
    phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
    city: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  loginRequest: ILoginRequest = {
    username: '',
    password: ''
  };

  phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    const phoneNumberRegex = /^[0-9]+$/;

    if (!control.value || (control.value && phoneNumberRegex.test(control.value))) {
      return null; // Valid
    } else {
      return { 'invalidPhoneNumber': true }; // Invalid
    }
  }

  emailValidator(control: AbstractControl): { [key: string]: any } | null {
    // Ensure the email contains the "@" symbol
    if (!control.value || (control.value && control.value.includes('@'))) {
      return null; // Valid
    } else {
      return { 'invalidEmail': true }; // Invalid
    }
  }

  register(): void {
    if (!this.registerForm.valid) {
      // Mark all fields as touched to display error messages
      this.registerForm.markAllAsTouched();
      return;
    }

    let request = this.registerForm.value as IRegisterRequest;
    request.username = this.registerForm.value.displayUsername?.toLowerCase() || '';

    console.log(request);
    
    this.loginRequest.password = request.password;
    this.loginRequest.username = request.username;
    
    this.accountService.register(request).subscribe(res => {
      this.accountService.login(request).subscribe(res => {
        this.accountService.saveToken(res.token);
        this.accountService.setCurrentUserId(res.userId);
        this.router.navigate(['']);
      });
    });
  }
}
