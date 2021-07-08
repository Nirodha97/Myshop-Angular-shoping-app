import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CurdService } from '../curd.service';


///Delete Dialog
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'delete.html',
  styleUrls: ['./delete.css']
})
export class DialogElementsExampleDialog3 {
 
  itemId:any;
  constructor(private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private http: HttpClient,public router : Router,public curdService: CurdService){
    this.itemId=data;
      }

      no(){
        this.dialog.closeAll();
      }

    yes(){
  
      console.log(this.itemId.itemId);
      let body = new HttpParams({
        fromObject:{
          'itemId':this.itemId.itemId,
           
        }
      })
       var url ="http://52.15.72.215:3000/api/items/delete";
       this.http.post(url,body ,{responseType: 'text'}).subscribe(
         (data :any) =>{
         // var obj = JSON.parse(data);
           console.log("Status: "+data);
        
           if(data=="Delete Success")
           {
             console.log(data); 
             this._snackBar.open('Item Delete Successful', '', {
              duration: 1500,panelClass: ['blue-snackbar']
            });
           }
    
           }
       );
    this.router.navigate(['/profile']);
    this.dialog.closeAll();
      }
  }



@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  title:any;
  itemId:any;
  price: number | undefined;
  category: string | undefined;
  brand: string | undefined;
  description: string | undefined;
  photo : string | undefined;
  loginstatus: boolean | undefined;
  constructor(public dialog: MatDialog,private http: HttpClient, public router : Router,public route: ActivatedRoute,private curdService: CurdService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params=>{
      this.itemId = params.id || 0;    
     
    });
    //alert(this.id);
   let body = new HttpParams({
    fromObject:{
      'itemId':this.itemId,
       
    }
  })
   var url ="http://52.15.72.215:3000/api/show/sellerProducts";
   this.http.post(url,body ,{responseType: 'text'}).subscribe(
     (data :any) =>{
      var obj = JSON.parse(data);
      var img="http://52.15.72.215:3000/"+obj[0].photo;
  
      this.title =obj[0].title;
       this.price=obj[0].price;
       this.description=obj[0].description;
      this.photo=img;
       console.log("Item details : "+data);
    
      
       console.log(this.title);
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

  home()
  {
 
    this.router.navigate(['/profile']);
    
  }

  remove(){
  
    console.log("Item Removed");
  this.dialog.open(DialogElementsExampleDialog3,{
    data:{
      itemId:this.itemId,
    }
  });
   
  }

}
   
   
