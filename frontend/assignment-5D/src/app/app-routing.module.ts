import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './services/guards/auth.guard';


const routes: Routes = [
  { path: '', loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule) },
  {path : 'user' , loadChildren : ()=> import(`./user/user.module`).then(m => m.UserModule), canActivate: [AuthGuard]},
  // {path: 'nursing', loadChildren: () => import("./nursing/nursing.module").then(m=> m.NursingModule), canActivate: [AuthGuard]},
  {path: '**', component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
