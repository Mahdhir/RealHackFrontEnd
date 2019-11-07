import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  value = 'password';
  showPwd = 'octicon octicon-eye';
  showPass = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastrService
    ) { }

  ngOnInit() {
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(['/dashboard/info']);
    //   return ;
    // }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
  });
    let user = localStorage.getItem('currentUser');
    if(user){
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    console.log('Submitted');
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('Invalid');
      return;
    }
   
    this.authService.login(this.f.email.value, this.f.password.value )
    .pipe(first())
    .toPromise().then(
      data => {
      console.log(data);
      this.router.navigate(['/home']);
    })
    .catch(
      error => {
        console.log(error);
        debugger;
        this.toastCtrl.error('Login Failed');
      }
    );
  }

  get f() { return this.loginForm.controls; }

  butClick() {
    this.showPass ? this.showPwd = 'octicon octicon-eye-closed' : this.showPwd = 'octicon octicon-eye';
  }

  navigateToSignup(){
    this.router.navigate(['/signup'])
  }
}
