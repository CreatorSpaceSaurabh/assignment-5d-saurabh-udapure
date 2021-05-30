import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private commonService: CommonService,
              private router: Router ,
              private toastr : ToastrService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.commonService.isLoggedIn()) {
        // return this.router.navigate(['/']);
        return true;
      } else {
        this.toastr.warning('Should login first to access path')
        return this.router.navigate(['/']);
      }

  }

}
