import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators,ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastrService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required]

  },
  { validator: this.matchingPasswords('password', 'confirmPassword') }
);
  }

  registerBtnPressed(){
    console.log(this.signupForm.value);
    this.authService.signUp(this.signupForm.value.name,this.signupForm.value.email,this.signupForm.value.password).toPromise()
    .then(
      data => {
        console.log(data);
      }
    )
    .catch(
      err => {
        console.log(err);
        
      }
    );
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string): ValidationErrors | null {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      } else { return null; }
    };
  }

}
