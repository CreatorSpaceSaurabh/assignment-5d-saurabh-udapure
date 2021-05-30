import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm : FormGroup;
  submitted = false;
  showPass : boolean = false;
  passwordType : string = 'password';

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      first_name : ['',[Validators.required]],
      last_name : ['',[Validators.required]],
      phone : ['',[Validators.required, Validators.pattern(/[0-9]/g),Validators.maxLength(10)] ],
      city : ['',[Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
        return;
    }

    // *** For navigation Test ***
    // setTimeout(() => {
    //   this.router.navigate(['/login']);
    // }, 1500);

    this.authService.register(this.signupForm.value).subscribe((res: any) => {
      if (res.code === 200) {
        const dataToSet = {
          user_id : res.data._id,
          token: res.token
        };
        this.toastr.success('Registered Successfully')
        this.router.navigate(['/login']);
      } else {
        this.toastr.error(res.message)
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
