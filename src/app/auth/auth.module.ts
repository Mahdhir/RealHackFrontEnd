import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
// import { ShowHidePasswordModule } from 'ngx-show-hide-password';
// import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';



@NgModule({
  declarations: [SignupComponent,LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    // ShowHidePasswordModule,
    // PasswordStrengthMeterModule
  ]
})
export class AuthModule { }
