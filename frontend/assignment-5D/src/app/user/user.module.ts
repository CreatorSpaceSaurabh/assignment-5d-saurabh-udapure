import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { AddMomentComponent } from './dashboard/moment/add-moment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { DeleteConfirmationComponent } from './dashboard/moment/delete-confirmation.component';


@NgModule({
  declarations: [DashboardComponent, DashboardMainComponent,AddMomentComponent,DeleteConfirmationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule
  ],
  entryComponents : [AddMomentComponent,DeleteConfirmationComponent]

})
export class UserModule { }
