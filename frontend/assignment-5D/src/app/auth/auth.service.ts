import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  weburl = environment.weburl;

  constructor(private httpClient: HttpClient) { }
  public login(loginData) {
    return this.httpClient.post(this.weburl + 'login' , loginData);
  }

  public register(userData : any) : Observable<any> {
    return this.httpClient.post(this.weburl + 'signup' , userData);
  }
}
