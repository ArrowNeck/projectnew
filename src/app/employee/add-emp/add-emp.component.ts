import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatSnackBar, MatSnackBarModule} from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddEmpComponent>,
    private service:EmployeeService, private snackBar:MatSnackBar) { }

    public listItems: Array<string> = [];

  ngOnInit() {
    this.resetForm();
    this.dropdownRefresh();
  }

  dropdownRefresh(){
    this.service.getDepDropdowbValues().subscribe(data=>{
      data.forEach(element => {
        this.listItems.push(element["dep_name"]);
      });
    });
  }

  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();

    this.service.formData = {
      emp_id: 0,
      emp_name: '',
      department: '',
      mail_id: '',
      doj: null,
    }
  }

  onClose(){
    this.dialogbox.close();
    this.service.filter('Register click');
  }

  onSubmit(form:NgForm){
    this.service.addEmployee(form.value).subscribe(res =>{
      this.resetForm(form);
      this.snackBar.open(res['status'], '', { 
        duration: 3000,
        verticalPosition:'top' });
    });
  }

}
 