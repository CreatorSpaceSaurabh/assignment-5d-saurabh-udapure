import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public isLoading = new BehaviorSubject(false);
  constructor() { }
  public isLoggedIn() {
    return localStorage.getItem('userData') != null;
  }
}
