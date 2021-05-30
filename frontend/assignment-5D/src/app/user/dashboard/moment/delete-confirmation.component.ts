import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../user.service";

@Component({
    selector: 'delete-confirmation-popup',
    templateUrl: './delete-confirmation.html',
    styleUrls: ['../dashboard.component.scss']
  })
  export class DeleteConfirmationComponent implements OnInit {
    // submitted = false;
    // tagitems : any = [] //'Tag1','Tag2'
    // previewFile : any ;
    // public imagePath;
    // imgURL: any;
    // userData : any ;
  
    constructor(
        public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private toastr : ToastrService,
        private userService : UserService
    ) {
    }
  
    ngOnInit(){
      console.log("\n\n element data to delete ==",this.data);
      
    }

    closeModal(){
        this.dialogRef.close();
    }

    deleteMoment(){
        this.userService.deletemoment(this.data._id).subscribe(async(res:any)=>{
            if(res && res.code==200){
                this.toastr.success(res.message);
                this.closeModal();
            }
            else{
                this.toastr.error(res.message)
            }
        })
    }
  
  }