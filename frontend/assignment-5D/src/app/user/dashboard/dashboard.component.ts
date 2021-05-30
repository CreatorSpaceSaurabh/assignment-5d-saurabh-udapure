import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { AddMomentComponent } from './moment/add-moment.component';
import { DeleteConfirmationComponent } from './moment/delete-confirmation.component';


const MONITORING_DATA: any = [
  {srNo : '1' , image : './../../../assets/images/5d-light.svg' , title : 'Title 1' , tags : 'tag1'},
  {srNo : '2' , image : './../../../assets/images/5d-light.svg' , title : 'Title 2' , tags : 'tag2'},
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    // ...
  ]
  
})
export class DashboardComponent implements OnInit {
 
  momentList : any;
  userId : any;
  constructor(private userservice : UserService,
    public dialogRef: MatDialogRef<AddMomentComponent>,
    public deletedialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog : MatDialog) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userData')).user_id;
    this.getAllMomentList();
  }
  
  displayedColumns2: string[] = [
    'srNo',
    'image',
    'title',
    'tags',
    'action'];
  dataSource2 = MONITORING_DATA;

  getAllMomentList(){
    let fetchObj = {
      count : 10,
      page : 0
    }
    this.userservice.getMomentList(fetchObj.count,fetchObj.page,this.userId).subscribe(async (res:any)=>{
      if(res && res.code==200){
        this.momentList = res && res.data ? res.data.filter(async(ele,index)=>{
          ele['srNo']=index+1;
          ele.title= ele.title.charAt(0).toUpperCase() + ele.title.substr(1).toLowerCase();
          let tagStr='' ;
          ele.tags.filter(tag=>{
            tagStr = tagStr + ', ' + tag
            return tagStr;
          })
          console.log(tagStr.slice(1),tagStr.substr(1),'tagStr.charAt(0)');
          tagStr = tagStr.charAt(0)==',' ? tagStr.slice(1) : tagStr
          ele['tagStr'] = tagStr;
          return ele;
        }) : [];
        console.log("moment list before==",this.momentList);
        // this.momentList = res.data.map(async(ele,index)=>{
        //   ele['srNo']=index+1;
        //   let obj = {
        //     srNo : index+1 , image : ele.imagePath , title : ele.title , tags : ele.tags[0]
        //   }
        //   return ele;
        // })
      }
      else{

      }
    })
  }


  addMoment(){
    this.dialogRef = this.dialog.open(AddMomentComponent,{
      width : "700px",
      data : { type : 'add_new_moment'}
    })

    this.dialogRef.afterClosed().subscribe(result =>{
      console.log("add moment dialog close")
      this.getAllMomentList();
    })
  }

  deleteMoment(element){
    this.deletedialogRef = this.dialog.open(DeleteConfirmationComponent,{
      width : "700px",
      data : element
    })

    this.deletedialogRef.afterClosed().subscribe(result =>{
      console.log("add moment dialog close")
      this.getAllMomentList();
    })
  }

  editMoment(element){
    this.dialogRef = this.dialog.open(AddMomentComponent,{
      width : "700px",
      data : {type : 'edit_moment' , obj : element} 
    })

    this.dialogRef.afterClosed().subscribe(result =>{
      console.log("add moment dialog close")
      this.getAllMomentList();
    })
  }
}




// **** Delete Confirmation *******


