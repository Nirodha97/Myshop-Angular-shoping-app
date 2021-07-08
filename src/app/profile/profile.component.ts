import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { CurdService } from '../curd.service';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { analyzeAndValidateNgModules } from '@angular/compiler';




///logout Dialog
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'logout.html',
  styleUrls: ['./logout.css']
})
export class DialogElementsExampleDialog3 {
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private http: HttpClient,public router : Router,public curdService: CurdService){
    
      }

      no(){
        this.dialog.closeAll();
      }

    yes(){
    //this.curdService.sendMessage(false);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
    this.dialog.closeAll();
      }
  }


///mystore Dialog
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'mystore.html',
  styleUrls: ['./mystore.css']
})
export class DialogElementsExampleDialog {
 
  sellingData;
  cusName: any;
  cusId: any;
  cusEmail: any;
  cusPhone: any;
  cusAddress:any;
  cusPostalCode:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private http: HttpClient,public router : Router){
    this.sellingData=data;


    let body = new HttpParams({
      fromObject:{
        'uid':this.sellingData.customerId,
         
      }
    })
     var url ="http://52.15.72.215:3000/api/show/users";
     this.http.post(url,body ,{responseType: 'text'}).subscribe(
       (data :any) =>{
     
         console.log("user details : "+data);
         var obj = JSON.parse(data);
         this.cusName =obj[0].name;
         this.cusId=obj[0].id;
         this.cusEmail=obj[0].email;
         this.cusPhone=obj[0].phone;
         this.cusAddress=obj[0].address;
         this.cusPostalCode=obj[0].postalcode;
        console.log(this.cusName);
  
         }
     );
  }
 

  
}

//myorders
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'myorders.html',
  // styleUrls: ['./chekoutDialog.css']
})
export class DialogElementsExampleDialog2 {
  orderData;
  selName: any;
  selId: any;
  selEmail: any;
  selPhone: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private http: HttpClient,public router : Router){
    this.orderData=data;
console.log(this.orderData);

let body = new HttpParams({
  fromObject:{
    'uid':this.orderData.sellerId,
     
  }
})
 var url ="http://52.15.72.215:3000/api/show/users";
 this.http.post(url,body ,{responseType: 'text'}).subscribe(
   (data :any) =>{
 
     console.log("user details : "+data);
     var obj = JSON.parse(data);
     this.selName =obj[0].name;
     this.selId=obj[0].id;
     this.selEmail=obj[0].email;
     this.selPhone=obj[0].phone;
    // this.userphone =obj[0].phone;
    console.log("Seller :: "+ this.selName);

     }
 );
  }

}



export interface UserItem{
  id : number;
  title: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  photo : string;
  date:any;
}

export interface OrderItems{
  oid : number;
  sid : number;
  cid : number;
  iid : number;
  title: string;
  price: number;
  qnt:number;
  date:any;
}

export interface SellingItems{
  oid : number;
  sid : number;
  cid : number;
  iid : number;
  title: string;
  price: number;
  qnt:number;
  date:any;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  panelOpenState = false;

  id: any;
  name: string | undefined;
  email: string | undefined;
  password : string | undefined;
  address : string | undefined;
  phone : number | undefined;
  postalcode : number | undefined;

  useritems : UserItem[] = [];
  orderitems : OrderItems[] = [];
  sellingitems : SellingItems[] = [];
  

  constructor(public dialog: MatDialog,private http: HttpClient,public router: Router, public route: ActivatedRoute,private curdService: CurdService) { }

  ngOnInit(): void {

    let userData = localStorage.getItem('userData');
   //User Details from local storage
    var obj = JSON.parse(userData ||'{}');
    this. id =obj[0].id;
    this.name =obj[0].name;
    this.email =obj[0].email;
    this.password =obj[0].password;
    this.address =obj[0].address;
    this.phone =obj[0].phone;
    this.postalcode =obj[0].postalcode;
    //alert(userData);


    let body = new HttpParams({
      fromObject:{
        'uid': this.id,
         
      }
    })
     var url ="http://52.15.72.215:3000/api/useritems";
     this.http.post(url,body ,{responseType: 'text'}).subscribe(
       (data :any) =>{
       
         var obj2 = JSON.parse(data);
  
        for (let i=0; i<obj2.length; i++){
          var img="http://52.15.72.215:3000/"+obj2[i].photo;
          var date=obj2[i].date.substring(0,10);
          this.useritems.push({id: obj2[i].id, title: obj2[i].title, price : obj2[i].price, category:obj2[i].category, brand:obj2[i].brand, description:obj2[i].description, photo: img,date:date,});
          console.log("date" + date);
         }
         }
     );

     //User's Oders
     let body2 = new HttpParams({
      fromObject:{
        'uid': this.id,
         
      }
    })
     var url ="http://52.15.72.215:3000/api/show/orders";
     this.http.post(url,body2 ,{responseType: 'text'}).subscribe(
       (data :any) =>{
       
        var obj3 = JSON.parse(data);
  
        for (let i=0; i<obj3.length; i++){
          var date=obj3[i].date.substring(0,10);
          this.orderitems.push({oid: obj3[i].id,sid: obj3[i].sellerid, cid: obj3[i].customerid,iid: obj3[i].itemid, title:obj3[i].title, price:obj3[i].price, qnt:obj3[i].qnt,date:date});
          console.log("date " + date);
         }
         }
     );

      //User's shop
      let body3 = new HttpParams({
        fromObject:{
          'uid': this.id,
           
        }
      })
       var url ="http://52.15.72.215:3000/api/show/sellingitems";
       this.http.post(url,body3 ,{responseType: 'text'}).subscribe(
         (data :any) =>{
          var obj4 = JSON.parse(data);
    
          for (let i=0; i<obj4.length; i++){
            var date=obj4[i].date.substring(0,10);
            this.sellingitems.push({oid: obj4[i].id,sid: obj4[i].sellerid, cid: obj4[i].customerid,iid: obj4[i].itemid, title:obj4[i].title, price:obj4[i].price, qnt:obj4[i].qnt,date:date});
            console.log("date " + date);
           }
           }
       );
  }

  logout(){
  
    console.log("Logout");
  this.dialog.open(DialogElementsExampleDialog3);
   
  }

  userdata(){
   
    this.router.navigate(['/userdata']);
  }
  

  viewOrderItem(order: { iid: any,oid:any,sid:any,title:any,price:any,qnt:any,date:any} ){

    // let body = new HttpParams({
    //   fromObject:{
    //     'uid':order.sid,
         
    //   }
    // })
    //  var url ="http://52.15.72.215:3000/api/show/users";
    //  this.http.post(url,body ,{responseType: 'text'}).subscribe(
    //    (data :any) =>{
     
    //      console.log("user details : "+data);
    //      var obj = JSON.parse(data);
    //      this.selName =obj[0].name;
    //      this.selId=obj[0].id;
    //      this.selEmail=obj[0].email;
    //      this.selPhone=obj[0].phone;
    //     // this.userphone =obj[0].phone;
    //     console.log("Seller :: "+ this.selName);
  
    //      }
    //  );

    
 
    this.dialog.open(DialogElementsExampleDialog2,{
      
      width: '330px',
      height: '400px',
      data: {
        itemId: order.iid,
        orderId:order.oid,
        sellerId:order.sid,
        title:order.title,
        price:order.price,
        qnt:order.qnt,
        date:order.date,
      }
    });
  }
  
  
  editItem(useritem: { id: any} ){
    this.router.navigate(['/edititem'],{queryParams:{id: useritem.id}});
   
  }

  viewSellingItem(sellingitem: {oid:any,cid:any, iid: any,title:any,price:any, qnt:any,date:any} ){


    this.dialog.open(DialogElementsExampleDialog,{
      width: '330px',
      height: '400px',
      data: {
        orderId:sellingitem.oid,
        customerId:sellingitem.cid,
        itemId: sellingitem.iid,
        title:sellingitem.title,
        price:sellingitem.price,
        qnt:sellingitem.qnt,
        date:sellingitem.date,
      }
    });
  }

  // openstore(){
  //   this.dialog.open(DialogElementsExampleDialog);
  // }

}
function MD_DIALOG_DATA(MD_DIALOG_DATA: any) {
  throw new Error('Function not implemented.');
}

