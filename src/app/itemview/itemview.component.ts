import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CurdService } from '../curd.service';
import { HttpClient, HttpParams } from '@angular/common/http';



@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.component.html',
  styleUrls: ['./itemview.component.css']
})
export class ItemviewComponent implements OnInit {
 
  products: any[]=[];
  
  id: number | undefined;
  userid:any;
  title: string | undefined;
  price: number | undefined;
  category: string | undefined;
  brand: string | undefined;
  description: string | undefined;
  photo: string | undefined;
  qnt: number =1;
  loginstatus: boolean | undefined;
  username:any;
  userphone:any;
  constructor(private http: HttpClient, public router : Router, public route: ActivatedRoute,private curdService: CurdService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.id = params.id || 0;
      this.userid= params.userid;
      this.title = params.title;
      this.price = params.price;
      this.category = params.category;
      this.brand=params.brand;
      this.description=params.description;
      this.photo =params.photo;

      
     
    });
  // alert(this.userid);


   let body = new HttpParams({
    fromObject:{
      'uid':this.userid,
       
    }
  })
   var url ="http://52.15.72.215:3000/api/show/users";
   this.http.post(url,body ,{responseType: 'text'}).subscribe(
     (data :any) =>{
      //  if(data!="wrong")
      //  {
         
       console.log("user details : "+data);
       var obj = JSON.parse(data);
       this.username =obj[0].name;
       this.userphone =obj[0].phone;
      // console.log(name+" "+phone);

        // }
       }
   );
  
   
   
  }

  mycart()
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

  notification()
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

  
  
  // cart(p:any){
  //   window.alert("Product added to cart "+p)
  // }
itemCart:any =[];
  addToCart() {
    this.products =[
      {id1:this.id, uid1:this.userid,title1:this.title,price1:this.price, category1: this.category, brand1:this.brand,description1:this.description,photo:this.photo,qnt1:this.qnt}
    ];
    console.log(this.products[0])
    let cardDataNull = localStorage.getItem('localCart');
    if(cardDataNull == null){
      let storeGetData: any = [];
      storeGetData.push(this.products[0]);
      localStorage.setItem('localCart',JSON.stringify(storeGetData));
    }

    else{
      var id = this.products[0].id1;
    
      let index:number = -1;
      this.itemCart =JSON.parse(localStorage.getItem('localCart') || '{}') ;
      for(let i=0; i<this.itemCart.length;i++){
        if(parseInt(id) === parseInt(this.itemCart[i].id1)){
          this.itemCart[i].qnt1 = parseInt(this.products[0].qnt1)+parseInt(this.itemCart[i].qnt1);
          index =i;
          break;
        }
      }
      if(index == -1){
        this.itemCart.push(this.products[0])
        localStorage.setItem('localCart',JSON.stringify(this.itemCart));
      }
      else{
        console.log(this.itemCart[0].qnt1);
        localStorage.setItem('localCart',JSON.stringify(this.itemCart))
      }
    }

    //localStorage.setItem('localCart',JSON.stringify(this.products[0]));
    //this.cartService.addToCart(this.products);
    window.alert('Your product has been added to the cart!');
  }
  
  home()
  {
 
    this.router.navigate(['/']);
    //window.location.reload();
  }

}
function body(url: string, body: any, arg2: { responseType: "text"; }) {
  throw new Error('Function not implemented.');
}

