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

  readonly APIUrl = "http://localhost:8080";

  getEmpList(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.APIUrl + '/employee');
  }

  addEmployee(emp:Employee){
    return this.http.post(this.APIUrl + '/employee/', emp);
  }

  private _listners = new Subject<any>();
    listen(): Observable<any>{
      return this._listners.asObservable();
    }
    filter(filterBy: string){
      this._listners.next(filterBy);
    }
  
    deleteEmployee(id:number){
      return this.http.delete(this.APIUrl+ '/employee/'+id);
    }

    updateEmployee(emp:Employee){
      return this.http.put(this.APIUrl + '/employee', emp);
    }

    getDepDropdowbValues():Observable<any>{
      return this.http.get<Department[]>(this.APIUrl+'/department');
    }
  
}
