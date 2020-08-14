import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatSnackBar, MatSnackBarModule} from '@angular/material';
import { DepartmentService } from 'src/app/services/department.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.css']
})
export class AddDepComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddDepComponent>,
    private service:DepartmentService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();

    this.service.formData = {
      dep_id: 0,
      dep_name: ''
    }
  }

  onClose(){
    this.dialogbox.close();
    this.service.filter('Register click');
  }

  onSubmit(form:NgForm){
    resp:String;
    this.service.addDepartment(form.value).subscribe(res =>{
      this.resetForm(form);
      this.snackBar.open(res['status'], '', { 
        duration: 3000,
        verticalPosition:'top' });
    });
  }

}
