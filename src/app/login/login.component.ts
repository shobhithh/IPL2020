import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { LoginserviceService } from '../Services/loginservice.service';

// import { Router } from '@angular/router';
// import { AuthService } from '../auth-guard/auth.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth-guard/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = false;
  loginform: FormGroup;
  logindata: string;
  token: string;
  userdata: string;
  errormessage: string;
  isAuthenticate = false;
  tokendata: string;
  isclicked=false
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }


  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginform.controls[controlName].hasError(errorName);
  }
  get username() {
    return this.loginform.get('username');
  }
  get password() {
    return this.loginform.get('password');
  }




  confirmcredentials() {
   
    setTimeout(() => {
    this.isclicked=true
    },2000);
    this.authService.getAuthenticated(this.loginform.value.username, this.loginform.value.password).subscribe(data => {
      if (data["status"]!='401') {
        this.router.navigate(['/playerstat']);
        this.isAuthenticate = true;
        this.isclicked=false
      }
      else {
     
        this.router.navigate(['/']);
        // this.errormessage = 'Invalid Credentials';
        this.isAuthenticate = false;
        this.isclicked=true
      }
    }


    )


  }

}

