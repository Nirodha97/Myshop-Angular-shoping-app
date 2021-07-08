import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  isDisabled1:boolean =true;
  isDisabled2:boolean =true;
  edit1:boolean=true;
  save1:boolean=false;
  edit2:boolean=true;
  save2:boolean=false;
  hide = true;
  userDetails :any=[];
  constructor(private http: HttpClient,private router: Router) { }

  nameControl = new FormControl('',[Validators.required]);
  emailControl = new FormControl('',[Validators.required,Validators.email]);
  addressControl = new FormControl('',[Validators.required]);
  phoneControl = new FormControl('',[Validators.required]);
  postalcodeControl = new FormControl('',[Validators.required]);
  ngOnInit(): void {
   
    this.userDetails = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log(this.userDetails[0]);
    
    this.nameControl.setValue(this.userDetails[0].name);
    this.emailControl.setValue(this.userDetails[0].email);
    this.addressControl.setValue(this.userDetails[0].address);
    this.phoneControl.setValue(this.userDetails[0].phone);
    this.postalcodeControl.setValue(this.userDetails[0].postalcode);
    
  
  }

  editDetails1(){
    this.isDisabled1=false;
    this.save1=true;
    this.edit1=false;
  }

  
  saveDetails1(){
    this.isDisabled1=true;
    this.save1=false;
    this.edit1=true;

    //alert(this.nameControl.value);
    let body = new HttpParams({
      fromObject:{
          'uid':this.userDetails[0].id,
          'name': this.nameControl.value,
          'email': this.emailControl.value,
          'address': this.addressControl.value,
          'phone': this.phoneControl.value,
          'postalcode':this.postalcodeControl.value
         
      }
    });

     var url ="http://52.15.72.215:3000/api/update/user";
     this.http.post(url,body ,{responseType: 'text'}).subscribe(
       (data :any) =>{
     
         console.log("user details : "+data);
         var obj = JSON.parse(data);
        //  localStorage.setItem('userData',JSON.stringify(data));
        // console.log(obj[0]);
        // this.router.navigate(['/profile']);
  
         }
     );
  }

  editDetails2(){
    this.isDisabled2=false;
    this.save2=true;
    this.edit2=false;
  }

  saveDetails2(){
    this.isDisabled1=true;
    this.save2=false;
    this.edit2=true;
  }
}
