import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddnewComponent } from './addnew/addnew.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { HomeComponent } from './home/home.component';
import { ItemviewComponent } from './itemview/itemview.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MycartComponent } from './mycart/mycart.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UserdataComponent } from './userdata/userdata.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'addnew',component:AddnewComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent},
  {path:'notification',component:NotificationComponent},
  {path:'mycart',component:MycartComponent},
  {path:'itemview',component:ItemviewComponent},
  {path:'nav',component:MainNavComponent},
  {path:'userdata',component:UserdataComponent},
  {path:'edititem',component:EditItemComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
