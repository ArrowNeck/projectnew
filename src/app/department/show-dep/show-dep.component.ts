import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Department } from 'src/app/models/department-model';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor() { }

  ListData : MatTableDataSource<any>;
  displayedColumns : string[] = ['Options', 'DepartmentID', 'DepartmentName'];

  ngOnInit() {
    this.refreshDepList();
  }

  refreshDepList(){
    var dummyData = [{DepartmentID:1, DepartmentName:"IT"}, {DepartmentID:2, DepartmentName:"Finace"}, {DepartmentID:3, DepartmentName:"ET"}];

    this.ListData = new MatTableDataSource(dummyData);
  }

  onEdit(dep: Department){
    console.log(dep);
  }

  onDelete(id:number){
    console.log(id);
  }

}
