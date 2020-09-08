import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { LoginserviceService } from '../Services/loginservice.service';
import { tokenName } from '@angular/compiler';
import { TokenError } from '@angular/compiler/src/ml_parser/lexer';
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

  // email: string = "admin@heraizen.com"
  // pass: string = "admin@123!"
  login: boolean = false
  loginform: FormGroup;
  logindata: string
  token: string;
  userdata: string
  errormessage: string
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }


  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  get username() {
    return this.loginform.get('username');
  }
  get password() {
    return this.loginform.get('password');
  }




  confirmcredentials() {

    this.authService.getAuthenticated(this.loginform.value.username,this.loginform.value.password).subscribe(data =>
      {
        console.log(data)
        if(data)
        {
          this.router.navigate(['/home']); 
        }
        else{
          this.router.navigate(['/'])
        }
      }
    
      
    )

   
  }

}

