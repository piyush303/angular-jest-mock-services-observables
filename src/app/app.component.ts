import { Component } from '@angular/core';
import { catchError, of, takeUntil, ReplaySubject, map } from 'rxjs';
import { UsersService } from './services/users.service';
import { User } from './services/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-jest-mock-services-observables';
  private destroyed$ = new ReplaySubject<void>(1);
  isApiFailed = false;
  userData: User | undefined;
  
  constructor(private readonly usersService: UsersService) {}
  
  ngOnInit() {}
  
  getUserById(id: number) {
    this.isApiFailed = false;
    
    this.usersService
      .getUserById(id)
      .pipe(
        map((response: User) => {
          this.userData = response;
        }),
        catchError(err => {
          this.isApiFailed = true;
          console.log(err)
          
          return of()
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe()
  }
  
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
