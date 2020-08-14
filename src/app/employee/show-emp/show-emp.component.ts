import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { Employee } from 'src/app/models/employee-model';
import { EmployeeService } from 'src/app/services/employee.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddEmpComponent} from 'src/app/employee/add-emp/add-emp.component';
import {MatSnackBar} from '@angular/material';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service: EmployeeService, private dialog: MatDialog,private snackBar:MatSnackBar) { 
    this.service.listen().subscribe((m:any)=>{
      this.refreshEmpList();
    });
  }

  ListData : MatTableDataSource<any>;
  displayedColumns : string[] = ['Options', 'EmployeeID', 'EmployeeName', 'Department', 'MailID', 'DOJ'];
  // displayedColumns : string[] = ['Options', 'emp_id', 'emp_name', 'department', 'mail_id', 'doj'];

  @ViewChild(MatSort, null) sort: MatSort;


  ngOnInit() {
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.service.getEmpList().subscribe(data => {
      this.ListData = new MatTableDataSource(data);
      this.ListData.sort = this.sort;
    });
  } 

  applyFilter(filtervalue: string){
    this.ListData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onAddDep(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddEmpComponent, dialogConfig);
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete ?')){
      this.service.deleteEmployee(id).subscribe(res=>{
        this.refreshEmpList();
        this.snackBar.open(res['status'], '', { 
          duration: 3000,
          verticalPosition:'top' });
      });
    }
  }

  onEdit(emp: Employee){
    this.service.formData = emp;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditEmpComponent, dialogConfig);
  }

}
