import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  istoggled = true;
  userId : any ;
  istoggledRight = false;
  userDetails : any ;

  constructor(public router:Router,
    private userservice : UserService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userData')).user_id
    if(this.userId){
      this.getUser();
    }
  }

  getUser(){
    this.userservice.getUserDetails(this.userId).subscribe(async (res:any)=>{
      if(res && res.code==200){
        this.userDetails = res && res.data ? res.data : {}
      }
      else{
        console.log("\n\n Error while fetching user details");
      }
    })
  }

  toggleMenu(){
    this.istoggled = !this.istoggled;
  }

  toggleRightMenu() {
    this.istoggledRight = !this.istoggledRight;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
  
}
