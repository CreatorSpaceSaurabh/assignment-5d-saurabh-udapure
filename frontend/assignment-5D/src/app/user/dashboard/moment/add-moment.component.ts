import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../user.service";

@Component({
    selector: 'add-moment-popup',
    templateUrl: './add-moment.component.html',
    styleUrls: ['../dashboard.component.scss']
})
export class AddMomentComponent implements OnInit {
    addMomentForm : FormGroup;
    submitted = false;
    tagitems : any = [] //'Tag1','Tag2'
    previewFile : any ;
    public imagePath;
    imgURL: any;
    userData : any ;
    headingText : string = 'Add new moment';
    btnText : string = 'Submit';
    existingMomentData : any;

    constructor(
        public dialogRef: MatDialogRef<AddMomentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr : ToastrService,
        private userService : UserService
    ) {
    }

    ngOnInit(){
        console.log("\n\n data ==",this.data);
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.addMomentForm = this.formBuilder.group({
            title : ['',[Validators.required,Validators.maxLength(150)]],
            tags : ['',[Validators.required]],
            fileToUpload : [''] //,[Validators.required, Validators.pattern(/[0-9]/g),Validators.maxLength(10)] 
        });

        if(this.data.type == 'edit_moment'){
            this.headingText = "Edit moment";
            this.btnText = 'Update'

            if(this.data.obj){
                this.existingMomentData = this.data.obj;
                this.addMomentForm.patchValue({
                    title : this.existingMomentData.title ? this.existingMomentData.title : '',
                    tags : this.existingMomentData.tags ? this.existingMomentData.tags : []
                })
                if(this.existingMomentData.tags){
                    this.tagitems = this.existingMomentData.tags
                }
                this.previewFile = this.existingMomentData.imagePath ? this.existingMomentData.imagePath : ''
            }
        }
        
    }
    get f() { return this.addMomentForm.controls; }

    closeModal(){
        this.dialogRef.close()
    }

    onSubmit(){
        let formDataObj = new FormData();
        formDataObj.append('title',this.addMomentForm.value.title);
        formDataObj.append('tags',JSON.stringify(this.addMomentForm.value.tags));
        // if(this.addMomentForm.value.fileToUpload){
        formDataObj.append('file',this.addMomentForm.get('fileToUpload').value);
        // }
        formDataObj.append('user_id',this.userData.user_id);
       
        // console.log("\n\n this.addMomentForm.value.tags ==",this.addMomentForm.value.tags)

        this.userService.addMoment(formDataObj).subscribe(async (res:any)=>{
            if(res && res.code==200){
                console.log("\n\n Response of add moment==",res);
                this.dialogRef.close();
                this.toastr.success(res.message)
            }
            else{
                this.toastr.error(res.message)
            }
        })
    }

    onItemRemoved(event){
        console.log('Tags removed=',event)
        console.log("After removed ==",this.tagitems);
        
    }

    onItemAdded(event){
        console.log('Tags Added=',event)
        console.log("After added ==",this.tagitems);
        let cpyTagsItem = [...this.tagitems];
        cpyTagsItem.filter((ele,index)=>{
            if(ele.hasOwnProperty('display')){
                delete this.tagitems[index]['display'];
                let temp = this.tagitems[index]['value'];
                delete this.tagitems[index]['value'];
                this.tagitems[index] = temp;
            }
        })
    }

    // onSelected(event){
    //     console.log('Tags Selected=',event)
    // }

    onFileSelect(event){
        if(event && event.target.files){
            const file = event.target.files[0];
            console.log("On file select ==",file);
            let mimeType = event.target.files[0].type;
            if (mimeType.match(/image\/*/) == null) {
                this.toastr.warning("Only images are supported.");
                return;
            }
            this.addMomentForm.get('fileToUpload').setValue(file);
            const reader = new FileReader();
            reader.onload = ()=>{
                this.previewFile = reader.result as string;
            }
            reader.readAsDataURL(file);
            
        }
    }

    onUpdate(){
        let formDataObj = new FormData();
        formDataObj.append('title',this.addMomentForm.value.title);
        formDataObj.append('tags',JSON.stringify(this.addMomentForm.value.tags));
        if(this.addMomentForm.value.fileToUpload){
        formDataObj.append('file',this.addMomentForm.get('fileToUpload').value);
        }
        formDataObj.append('user_id',this.userData.user_id);
        formDataObj.append('moment_id',this.existingMomentData._id);
       
        // console.log("\n\n this.addMomentForm.value.tags ==",this.addMomentForm.value.tags)

        this.userService.editMoment(formDataObj).subscribe(async (res:any)=>{
            if(res && res.code==200){
                console.log("\n\n Response of add moment==",res);
                this.dialogRef.close();
                this.toastr.success(res.message)
            }
            else{
                this.toastr.error(res.message)
            }
            this.headingText = "Add new moment";
            this.btnText = 'Submit'
        })
    }
}