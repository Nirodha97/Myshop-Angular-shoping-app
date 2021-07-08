import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface Categotry {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {

  categories: Categotry[] = [
    {value: '0', viewValue: 'Electronic'},
    {value: '1', viewValue: 'Fashion'},
    {value: '2', viewValue: 'Grocery'},
    {value: '3', viewValue: 'Foods'},
    {value: '4', viewValue: 'Furnitures'},
    {value: '5', viewValue: 'Toys'},
    {value: '6', viewValue: 'Flowers'},
    {value: '7', viewValue: 'Handcrafts'},
    {value: '8', viewValue: 'Gifts'},
    {value: '9', viewValue: 'Other'},
   
    
  ];

  title = new FormControl('',[Validators.required]); 
  price = new FormControl('',[Validators.required]); 
  brand = new FormControl('',[Validators.required]); 
  description = new FormControl('',[Validators.required]); 
  category = new FormControl('', Validators.required);
  images: any;
  userDetails: any=[];
  uid:any;
  



  constructor(private http: HttpClient,public router : Router) { }

  ngOnInit(): void {
   
  }
  
  getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.price.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.brand.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.description.hasError('required')) {
      return 'You must enter a value';
    }
  

    return null;
  }




//Image
url="/assets/itempic1.png";
onselectFile(e: any){
  if(e.target.files){
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=>{
      this.url=event.target.result;
    }

    const file1 = e.target.files[0];
    this.images =file1;
  }
}



  date = new Date().toISOString().slice(0, 10)
  submit(){
    this.userDetails = JSON.parse(localStorage.getItem('userData') || '{}');
      this.uid=this.userDetails[0].id;
      const formData = new FormData();
      formData.append('file',this.images);
      formData.append('userid', this.uid);
      formData.append('title', this.title.value);
      formData.append('price', this.price.value);
      formData.append('category', this.category.value);
      formData.append('brand', this.brand.value);
      formData.append('description',this.description.value);
      formData.append('date',this.date);
      this.http.post<any>('http://52.15.72.215:3000/api/myshop/items',formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err),
       
      );
      this.router.navigate(['/']);
    
    // alert(this.category.value);
    // let body = new HttpParams({
    //   fromObject:{
    //       'userid': '1001',
    //       'title': this.title.value,
    //       'price': this.price.value,
    //       'category': this.category.value,
    //       'brand': this.brand.value,
    //       'description': this.description.value,
    //       'date':this.date,
         
         
    //   }
    // });
   
    // alert(body);
    // var url ="http://52.15.72.215:3000/api/myshop/items";
    // this.http.post(url ,body,{responseType: 'text'}).subscribe(
    //   (data :any) =>{
    //     if(data="Insert Success")
    //     {
    //       alert(data);
    //     }
          
    //     }
    // );

 

  }
  

 


  
 
}
