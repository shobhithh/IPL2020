import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-guard/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authservice:AuthService,private route:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authservice.logOut();
    this.route.navigateByUrl('/');
  }
  

}
