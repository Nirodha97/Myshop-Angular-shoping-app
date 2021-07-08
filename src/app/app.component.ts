import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { CurdService } from './curd.service';
import { OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myshop';
  loginstatus: any;
  opened=false;
  
  constructor(public router : Router,private curdService: CurdService){
   
  }
  addnew()
  {
    this.loginstatus= this.curdService.autologin();
    if(this.loginstatus==true)
  {
    this.router.navigate(['/addnew']);
  }
  else
  {
    this.router.navigate(['/login']);
  }
   
  }
  
  home()
  {
    this.router.navigate(['/']);
  }

  profile()
  {
    this.loginstatus= this.curdService.autologin();
    if(this.loginstatus ==true)
    {
      this.router.navigate(['/profile']);
    }
    else
    {
      this.router.navigate(['/login']);
    }
    
  }
}
