import { NumberSymbol } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'chekoutDialog.html',
  styleUrls: ['./chekoutDialog.css']
})
export class DialogElementsExampleDialog {
  cid:any;
  order:any=[];
  date:any;
  x:any;
  constructor(public dialog: MatDialog,private http: HttpClient,public router : Router){}

  pay(){
    let userData = localStorage.getItem('userData');
    var obj1 = JSON.parse(userData ||'{}');
    this.cid =obj1[0].id;
    console.log(this.cid);

    let itemsData = localStorage.getItem('localCart');
    var obj2 = JSON.parse(itemsData ||'{}');
    for(let i=0;i<obj2.length;i++){
      this.order[i]=obj2[i];
      this.order[i].cid=this.cid;//send customer id
     // console.log(this.uid[i].uid1);
    }
let l=obj2.length;
this.x=0;
    this.date = new Date().toISOString().slice(0, 10);
    for(let i=0;i<obj2.length;i++){

      let body = new HttpParams({
        fromObject:{
            'sellerid':this.order[i].uid1,
            'customerid': this.order[i].cid,
            'itemid':this.order[i].id1,
            'title':this.order[i].title1,
            'price':this.order[i].price1,
            'qnt':this.order[i].qnt1,
            'date':this.date,
           
        }
      });
      // const formData = new FormData();
      // formData.append('sellerid',this.order[i].uid1);
      // formData.append('customerid', this.order[i].cid);
      // formData.append('itemid',this.order[i].id1);
      // formData.append('title', this.order[i].title1);
      // formData.append('price', this.order[i].price1);
      // formData.append('qnt', this.order[i].qnt1);
      // formData.append('date',this.date);
      
      this.http.post<any>('http://52.15.72.215:3000/api/myshop/order',body).subscribe(
        (res) => console.log(res),
        (err) => console.log(err),
        this.x=this.x+1,
       
      );
    
    }

    console.log(this.x+"--"+l);
    if(this.x==l){
      localStorage.removeItem('localCart');
      this.x=0;
    }
  
    this.dialog.closeAll();
    window.location.reload();
  }

  cut(){
    this.dialog.closeAll();
  }

}


@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  //
  
  cartItems=[];
  quantity:number=1;
  i=1;
  div1:boolean=false;
 total:number =0;
  constructor(public dialog: MatDialog) { }
 
  ngOnInit(): void {
    this.cartDetails();
    this.getTotal();
    
   
  }

  openChekout(){
    this.dialog.open(DialogElementsExampleDialog);
  }
  

  getCartDetails:any =[];
  cartDetails(){
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '{}');
      console.log(this.getCartDetails[0].title1);
    }
    
  }
  
  getTotal(){
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '{}');
      for(let i=0; i<this.getCartDetails.length;i++){
        this.total= this.total+parseInt(this.getCartDetails[i].price1);
      }
    }
    else
    {
      this.total=0;
      this.div1=true;
    }
   
  }

  openDialog(id :any){
    this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '{}');
    for(let i=0; i<this.getCartDetails.length;i++){
      if(this.getCartDetails[i].id1 === id){
        this.total= this.total-(this.getCartDetails[i].price1*this.getCartDetails[i].qnt1);
        this.getCartDetails.splice(i,1);
        localStorage.setItem('localCart',JSON.stringify(this.getCartDetails));
       
        // this.cartDetails();
       // this.getTotal();
      
      alert(this.total);
      if(this.total==0){
        this.div1=true;
      }
      }
    }
    
  }
  
  plus(id:any,qnt:any){
   
    for(let i=0; i<this.getCartDetails.length;i++){
      if(this.getCartDetails[i].id1 === id){
        if(this.getCartDetails[i].qnt1<10)
        {
          this.getCartDetails[i].qnt1 =  parseInt(qnt) +1;
          this.total= this.total+parseInt(this.getCartDetails[i].price1);
        }
       // console.log(this.getCartDetails[i].qnt+" ooo");
      }
    }

    localStorage.setItem('localCart',JSON.stringify(this.getCartDetails));
  }

  minus(id:any,qnt:any){
    for(let i=0; i<this.getCartDetails.length;i++){
      if(this.getCartDetails[i].id1 === id){
        if(this.getCartDetails[i].qnt1>1)
        {
          this.getCartDetails[i].qnt1 =  parseInt(qnt) -1;
          this.total= this.total-parseInt(this.getCartDetails[i].price1);
        }
      
       // console.log(this.getCartDetails[i].qnt+" ooo");
      }
    }

    localStorage.setItem('localCart',JSON.stringify(this.getCartDetails));
    
    
  }

 
 
  


 
 
}

// export class CheckboxConfigurableExample {
//   checked = false;
//   indeterminate = false;
//   labelPosition: 'before' | 'after' = 'after';
//   disabled = false;
// }
