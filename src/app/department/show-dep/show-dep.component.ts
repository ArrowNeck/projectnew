import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { Department } from 'src/app/models/department-model';
import { DepartmentService } from 'src/app/services/department.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddDepComponent} from 'src/app/department/add-dep/add-dep.component';
import {MatSnackBar} from '@angular/material';
import { EditDepComponent } from '../edit-dep/edit-dep.component';
@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor( private service: DepartmentService, private dialog: MatDialog,private snackBar:MatSnackBar) {
    this.service.listen().subscribe((m:any)=>{
      console.log(m);
      this.refreshDepList();
    })
   }

  ListData : MatTableDataSource<any>;
  displayedColumns : string[] = ['Options', 'DepartmentID', 'DepartmentName'];

  @ViewChild(MatSort, null) sort: MatSort;

  ngOnInit() {
    this.refreshDepList();
  }

  refreshDepList(){
    this.service.getDepList().subscribe(data => {
      this.ListData = new MatTableDataSource(data);
      this.ListData.sort = this.sort;
    });
  }

  applyFilter(filtervalue: string){
    this.ListData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onEdit(dep: Department){
    this.service.formData = dep;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%"; 
    this.dialog.open(EditDepComponent, dialogConfig);
  }

  onDelete(dep: Department){
    if(confirm('Are you sure to delete ?')){
      this.service.deleteDepartment(dep).subscribe(res=>{
        this.refreshDepList();
        this.snackBar.open(res.toString(), '', { 
          duration: 3000,
          verticalPosition:'top' });
      });
    }
  }

  onAddDep(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddDepComponent, dialogConfig);
  }

}
