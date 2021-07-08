import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide=true;
  hide2=true;
  constructor(private http: HttpClient, private router: Router,private _snackBar: MatSnackBar) { }


  NameControl = new FormControl('',[Validators.required]);
  EmailControl = new FormControl('',[Validators.required,Validators.email]);
  PasswordControl = new FormControl('',[Validators.required]);
  ConformPasswordControl = new FormControl('',[Validators.required]);
  AddressControl = new FormControl('',[Validators.required]);
  PhoneControl = new FormControl('',[Validators.required]);
  PostalControl = new FormControl('',[Validators.required]);
  ngOnInit(): void {
   
  }


  getErrorMessage1() {
    if (this.NameControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage2(){
    if (this.EmailControl.hasError('required')) {
      return 'You must enter a value';
    }

    if(this.EmailControl.hasError('email')){
      return 'Not a valid email';
    }
    return null;
  }


  getErrorMessage3(){
    if (this.PasswordControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage4(){
    if (this.ConformPasswordControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage5(){
    if (this.AddressControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage6(){
    if (this.PhoneControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage7(){
    if (this.PostalControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }
  

    

    

  signup(){
    let body = new HttpParams({
      fromObject:{
          'name': this.NameControl.value,
          'email': this.EmailControl.value,
          'password': this.PasswordControl.value,
          'address': this.AddressControl.value,
          'phone': this.PhoneControl.value,
          'postalcode':this.PostalControl.value
         
      }
    });


    if(this.NameControl.value=="" || this.EmailControl.value=="" ||  this.PasswordControl.value=="" || 
    this.ConformPasswordControl.value=="" || this.AddressControl.value=="" || this.PhoneControl.value=="" || 
    this.PostalControl.value=="" ){
      alert("Registration Unsuccessfully !!!");
    }

    else if(this.PasswordControl.value==this.ConformPasswordControl.value){
      var url ="http://52.15.72.215:3000/api/myshop/user";
      this.http.post(url ,body,{responseType: 'text'}).subscribe(
        (data :any) =>{
          if(data=="Insert Success")
          {
            // alert(data);
            this._snackBar.open('Registration Successful', '', {
              duration: 1500,panelClass: ['blue-snackbar']
            });
            this.router.navigate(['/login']);
            
          }
          else{
            alert("Email already used !");
          }
            
          }
      );
    }
    else{
      alert("Password does not match !")
    }
    
  }
}
