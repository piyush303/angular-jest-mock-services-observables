import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly usersApiPath = 'https://jsonplaceholder.typicode.com/users';

  constructor(private readonly http: HttpClient) { }
  
  getUsers(): Observable<any> {
    return this.http.get(this.usersApiPath);
  }
  
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.usersApiPath}/${id}`);
  }
}
