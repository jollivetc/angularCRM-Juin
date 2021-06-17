import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

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
    this.loginForm = new FormGroup({
      login: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password: new FormControl('',[Validators.required,
                                    Validators.minLength(3),
                                    checkPassword])
    }, );
  }

  onSubmit(){
    const user = this.authent.authentUser(this.loginForm.value.login, this.loginForm.value.password);
    if(user !== null){
      this.router.navigateByUrl('home');
    }
  }

  ngOnInit(): void {
  }

}
