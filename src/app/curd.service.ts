import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurdService {

  
  
  constructor() {
   
    }

autologin(){
  let userData = localStorage.getItem('userData');
  if(userData)
  {
    return true ;
  }
  return
}

}
