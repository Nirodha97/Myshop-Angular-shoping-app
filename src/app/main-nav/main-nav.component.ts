import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CurdService } from '../curd.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  loginstatus: any;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,public router : Router,private curdService: CurdService) {}

  mycart2()
  {
   
    
    this.loginstatus= this.curdService.autologin();
    if(this.loginstatus==true)
      {
        this.router.navigate(['/mycart']);
      }
    else
    {
      this.router.navigate(['/login']);
    }
    
  }

  notification2()
  {
    
   
    this.loginstatus= this.curdService.autologin();
    if(this.loginstatus==true)
      {
        this.router.navigate(['/notification']);
      }
    else
    {
      this.router.navigate(['/login']);
    }
  }

  home(drawer:any){
    drawer.toggle();
   this.router.navigate(['/']);
   
  }


  mycart(drawer:any)
  {
    drawer.toggle();
    this.loginstatus= this.curdService.autologin();
    if(this.loginstatus==true)
  {
    this.router.navigate(['/mycart']);
  }
  else
  {
    this.router.navigate(['/login']);
  }
    
  }

  notification(drawer:any)
  {
    drawer.toggle();
    this.loginstatus= this.curdService.autologin();
    if(this.loginstatus==true)
      {
      this.router.navigate(['/notification']);
      }
    else
    {
      this.router.navigate(['/login']);
    }
    
  }

  profile(drawer:any){
    drawer.toggle();
    this.loginstatus= this.curdService.autologin();
    if(this.loginstatus==true)
      {
        this.router.navigate(['/profile']);
      }
    else
    {
      this.router.navigate(['/login']);
    }
   
  }

  addnew(drawer:any){
    drawer.toggle();
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

  help(drawer:any){
    drawer.toggle();
    alert("This will show the Help option");
   
  }

  rate(drawer:any){
    drawer.toggle();
    alert("This will show the rate option");
  }

  info(drawer:any){
    drawer.toggle();
    alert("This will show the information");
  }

 
}
