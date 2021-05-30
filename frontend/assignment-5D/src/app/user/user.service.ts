import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  weburl = environment.weburl;
  constructor(private httpClient: HttpClient) { }

  public getUserDetails(id : any) {
    return this.httpClient.get(this.weburl + 'getUser?user_id=' + id );
  }


  public getMomentList(limit:any,page:any,userId : any) {
    return this.httpClient.get(this.weburl + `getAllMoments?limit=${limit}&page=${page}&user_id=${userId}` );
  }

  public addMoment(momentObj : any) {
    return this.httpClient.post(this.weburl + 'addMoment' , momentObj);
  }

  public editMoment(momentObj : any) {
    return this.httpClient.put(this.weburl + 'editMoment' , momentObj);
  }

  public deletemoment(momentId : any) {
    return this.httpClient.delete(this.weburl + `deleteMoment?moment_id=${momentId}`);
  }

}
