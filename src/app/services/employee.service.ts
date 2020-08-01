import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from 'src/app/models/employee-model';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import { stringify } from 'querystring';
import { Department } from '../models/department-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private http:HttpClient) { }

  formData: Employee;

  readonly APIUrl = "http://localhost:80/api";

  getEmpList(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.APIUrl + '/employee/getData.php');
  }

  addEmployee(emp:Employee){
    return this.http.post(this.APIUrl + '/employee/postData.php', emp);
  }

  private _listners = new Subject<any>();
    listen(): Observable<any>{
      return this._listners.asObservable();
    }
    filter(filterBy: string){
      this._listners.next(filterBy);
    }
  
    deleteEmployee(emp:Employee){
      console.log("dep id",emp);
      return this.http.post(this.APIUrl+ '/employee/deleteData.php', emp);
    }

    updateEmployee(emp:Employee){
      return this.http.post(this.APIUrl + '/employee/editData.php', emp);
    }

    getDepDropdowbValues():Observable<any>{
      return this.http.get<Department[]>(this.APIUrl+'/department/getData.php');
    }
  
}
