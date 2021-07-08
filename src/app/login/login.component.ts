import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurdService } from '../curd.service';

declare global {
  var x: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 loginstatus: any;
 hide=true;
  constructor(private http: HttpClient,public router: Router,private curdService: CurdService) { }

  loginEmail = new FormControl('',[Validators.required,Validators.email]);
  loginPassword = new FormControl('',[Validators.required]);
  ngOnInit(): void {
  }


  getErrorMessage1(){
    if (this.loginEmail.hasError('required')) {
      return 'You must enter a value';
    }

    if(this.loginEmail.hasError('email')){
      return 'Not a valid email';
    }
    return null;
  }


  getErrorMessage2(){
    if (this.loginPassword.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  register()
  {
    this.router.navigate(['/register']);
  }

  login()
  {

    let body = new HttpParams({
      fromObject:{
        'email':this.loginEmail.value,
        'password':this.loginPassword.value, 
      }
    })



    var url ="http://52.15.72.215:3000/api/myshop/login";
    this.http.post(url ,body,{responseType: 'text'}).subscribe(
      (data :any) =>{
        if(data!="wrong")
        {
          
         localStorage.setItem('userData',data);
         // alert(data);
          console.log(localStorage.getItem('userData'));
          var obj = JSON.parse(data);
          var id =obj[0].id;
          var name =obj[0].name;
          var email =obj[0].email;
          var password =obj[0].password;
          var address =obj[0].address;
          var phone =obj[0].phone;
          var postalcode =obj[0].postalcode;
         
          this.router.navigate(['/profile'],{queryParams:{id: id,name: name, email: email,password: password, address: address, phone:phone, postalcode: postalcode }});
        }
        else{
          alert("Email or Password Incorrect !");
        }

        
        }
    );

   
    
  }
    //this.router.navigate(['/profile']);
  

}
