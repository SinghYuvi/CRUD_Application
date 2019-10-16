import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  

  readonly baseURL = 'http://localhost:3000/employees';
  readonly baseURLCreate = 'http://localhost:3000/employees/create';
  readonly baseURLUpdate = 'http://localhost:3000/employees/update';
  readonly baseURLDelete = 'http://localhost:3000/employees/delete';

  constructor(private http: HttpClient) {
   
   }

  postEmployee(emp: Employee) {
    return this.http.post(this.baseURLCreate, emp);
  }

  getEmployeeList() {
    return this.http.get(this.baseURL);
  }

  putEmployee(emp: Employee) {
    return this.http.put(this.baseURLUpdate + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURLDelete + `/${_id}`);
  }

}