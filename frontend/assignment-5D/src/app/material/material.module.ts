import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from  '@angular/material/icon';
import {MatCheckboxModule} from  '@angular/material/checkbox';
import {MatToolbarModule} from  '@angular/material/toolbar';
import {MatCardModule} from  '@angular/material/card';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from  '@angular/material/list';
import {MatRadioModule} from  '@angular/material/radio';
import {MatInputModule} from  '@angular/material/input';
import {MatDatepickerModule} from  '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatTableModule, MatSelectModule, MatBadgeModule, MatMenuModule,MatSlideToggleModule,
    MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule,FormsModule, MatCardModule,MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule,
    MatDialogModule
  ],
  exports: [FormsModule,MatSelectModule,MatBadgeModule,MatMenuModule, MatTableModule,MatSlideToggleModule, MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule,],    
  
})
export class MaterialModule { }
