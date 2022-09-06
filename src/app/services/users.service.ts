import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly usersApiPath = 'https://jsonplaceholder.typicode.com/users';

  constructor(private readonly http: HttpClient) { }
  
  getUsers(): Observable<User[]> {
    return this.http.get(this.usersApiPath).pipe(
      map((users) => users as User[])
    );
  }
  
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.usersApiPath}/${id}`);
  }
}
