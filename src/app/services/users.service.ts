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
    
  getUserById(id: number): Observable<User> {
    return this.http.get(`${this.usersApiPath}/${id}`).pipe(
      map((user) => user as User)
    );
  }
}
