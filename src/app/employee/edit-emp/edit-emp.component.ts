import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatSnackBar, MatSnackBarModule} from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<EditEmpComponent>,
    private service:EmployeeService, private snackBar:MatSnackBar) { }

    public listItems: Array<string> = [];

  ngOnInit() {
    this.dropdownRefresh();
  }


  dropdownRefresh(){
    this.service.getDepDropdowbValues().subscribe(data=>{
      data.forEach(element => {
        this.listItems.push(element["dep_name"]);
      });
    });
  }

  onClose(){
    this.dialogbox.close();
    this.service.filter('Register click');
  }

  onSubmit(form:NgForm){
    this.service.updateEmployee(form.value).subscribe(res =>{
      this.snackBar.open(res['status'], '', { 
        duration: 3000,
        verticalPosition:'top' });
    });
  } 

}
