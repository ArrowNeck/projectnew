import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Department} from 'src/app/models/department-model';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor( private http:HttpClient) { }

  formData: Department;

  readonly APIUrl = "http://localhost:8080";

  getDepList(): Observable<Department[]>{
    return this.http.get<Department[]>(this.APIUrl + '/department');
  }

  addDepartment(dep:Department){
    return this.http.post(this.APIUrl + '/department/', dep);
  }

  private _listners = new Subject<any>();
    listen(): Observable<any>{
      return this._listners.asObservable();
    }
    filter(filterBy: string){
      this._listners.next(filterBy);
    }
  
    deleteDepartment(id: number){
      return this.http.delete(this.APIUrl + '/department/' +id);
    }

    updateDepartment(dep:Department){
      return this.http.put(this.APIUrl + '/department', dep);
    }
  
}
