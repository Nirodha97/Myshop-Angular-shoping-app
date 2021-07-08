import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PermissionsPluginWeb } from '@capacitor/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CurdService } from '../curd.service';





//1.to save data
export interface Item{
  id : number;
  userid: number;
  title: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  photo : string;
}





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  uid:any;


  
  div1:boolean=true;
  div2:boolean=false;
  title : string | undefined;
  price : number | undefined;
  x: any;

  //2.Create array
  items : Item[] = [];
  itemsToShow: Item[] =[];

  ItemControl = new FormControl();
  //Filterd array
  filteredItems: Observable<Item[]>| undefined;

  //peopleArray:any;
  loginstatus: any ;

  //3.http 
  constructor(public router : Router,public http: HttpClient,private curdService: CurdService) { 
   
  }


  ngOnInit(): void {

    this.loginstatus= this.curdService.autologin();
    console.log( "Login Status : "+this.loginstatus);
    
    var url ="http://52.15.72.215:3000/api/items";
    this.http.get(url,{responseType: 'text'}).subscribe(
      (data :any) =>{
        
          
          var obj = JSON.parse(data);
          // for (const i of obj) {    // this is just to see it works

          //   console.log('ID - ', i.id);
            
          // }
         
          for (let i=0; i<obj.length; i++){
           var img="http://52.15.72.215:3000/"+obj[i].photo;
          // console.log(obj[i].userid);
            this.items.push({id: obj[i].id, userid:obj[i].userid, title: obj[i].title, price : obj[i].price, category:obj[i].category, brand:obj[i].brand, description:obj[i].description, photo: img});
            console.log("response[i].id" + obj[0].date);
    
          }

          this.itemsToShow = this.items;
          
        }
    );

    this.filteredItems = this.ItemControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter1(name) : this.items.slice())
      );

     
   
  }

  //Filter function
  private _filter1(name: string):  Item[]  {
    const filterValue = name.toLowerCase();
    return this.items.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

  //Display name
  displayFn1(item?:Item): string | ''{
    return item? item.title: '';
  }

  search(){
    
   var ti1= (this.ItemControl.value)?this.ItemControl.value.title:'';
   //alert(ti1);
    this.itemsToShow = this.items.filter(item => item.title === ti1);
  }

  nav(){
    alert("sdd")
  }
 

notification()
  {
    this.router.navigate(['/notification']);
  }

  
mycart()
{
  this.router.navigate(['/mycart']);
}

adnew(){
  
  this.router.navigate(['/mycart']);
}

home()
  {
   
    this.div1=true;
    this.div2=false;
    this.router.navigate(['/']);
   // window.location.reload();
   this.itemsToShow = this.items;
  }


  view(item: { id: any; userid:any, title: any, price : any, category: any, brand : any, description: any,photo: any } ){
  

  //   let body = new HttpParams({
  //     fromObject:{
  //       'id':item.id,
  //     }
  //   });
    
  //   var url ="http://52.15.72.215:3000/api/myshop/login";
  //   this.http.post(url ,body,{responseType: 'text'}).subscribe(
  //     (data :any) =>{
       
  // console.log("Item Click : "+data);
          
  //     });
         
        



    this.router.navigate(['/itemview'],{queryParams:{id: item.id,userid:item.userid,title: item.title,price: item.price, category: item.category,brand: item.brand,description: item.description, photo: item.photo }});
  // alert(item.description)
  }
 
electonics(){
  this.div1=false;
  this.div2=true;
  this.x="Electonics";
  this.itemsToShow = this.items.filter(item => item.category === '0');
}

fashion(){
  this.div1=false;
  this.div2=true;
  this.x="Fashion";
  this.itemsToShow = this.items.filter(item => item.category === '1');
}

grocery(){
  this.div1=false;
  this.div2=true;
  this.x="Grocery";
  this.itemsToShow = this.items.filter(item => item.category === '2');
}

foods(){
  this.div1=false;
  this.div2=true;
  this.x="Foods";
  this.itemsToShow = this.items.filter(item => item.category === '3');
}
furnitures(){
  this.div1=false;
  this.div2=true;
  this.x="Furniture";
  this.itemsToShow = this.items.filter(item => item.category === '4');
}

toys(){
  this.div1=false;
  this.div2=true;
  this.x="Toys";
  this.itemsToShow = this.items.filter(item => item.category === '5');
}
flowers(){
  this.div1=false;
  this.div2=true;
  this.x="Flowers";
  this.itemsToShow = this.items.filter(item => item.category === '6');

}

handcrafts(){
  this.div1=false;
  this.div2=true;
  this.x="Handcraft";
  this.itemsToShow = this.items.filter(item => item.category === '7');
}

gifts(){
  this.div1=false;
  this.div2=true;
  this.x="Gifts";
  this.itemsToShow = this.items.filter(item => item.category === '8');
}

other(){
  this.div1=false;
  this.div2=true;
  this.x="Other";
  this.itemsToShow = this.items.filter(item => item.category === '9');

}



}
