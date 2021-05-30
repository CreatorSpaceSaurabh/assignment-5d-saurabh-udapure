import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  showPass : boolean = false;
  passwordType : string = 'password';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastr : ToastrService
              ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        alert("Details are invalid")
        return;
    }

    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      if (res.code === 200) {
        const dataToSet = {
          user_id : res.data._id,
          token: res.token
        };
        this.toastr.success('Login Sucess');
        localStorage.setItem('userData', JSON.stringify(dataToSet));
        this.router.navigate(['/user'])
      } else {
        this.toastr.error(res.message);
        console.log(res.message);
      }
    });

}

showHidePass(val?){
  if (this.passwordType === 'password') {
    this.passwordType = 'text';
    this.showPass = true;
  } else {
    this.passwordType = 'password';
    this.showPass = false;
  }
}
}
