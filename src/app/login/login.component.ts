import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { User } from './model/user';

function checkPassword(c:AbstractControl): ValidationErrors|null {
  if((c.value as string).indexOf('$')<0){
    return null
  }
  return {'checkPassword':'should not contain $'};
}


@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authent: AuthenticationService, private router: Router) {
    this.authent.disconnect();
    this.loginForm = new FormGroup({
      login: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password: new FormControl('',[Validators.required,
                                    Validators.minLength(3),
                                    checkPassword])
    }, );
  }

  onSubmit(){
    this.authent.authentUser(this.loginForm.value.login, this.loginForm.value.password)
            .subscribe(
              (result)=>{
                if(result !== null && result !== undefined){
                  this.router.navigateByUrl('home')
                }
              },
              (error)=>{alert(error.error.message)},
              ()=>{}
            );
  }

  ngOnInit(): void {
  }

}
