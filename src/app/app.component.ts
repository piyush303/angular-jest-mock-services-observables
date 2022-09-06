import { Component } from '@angular/core';
import { catchError, of, takeUntil, ReplaySubject, map } from 'rxjs';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-jest-mock-services-observables';
  private destroyed$ = new ReplaySubject<void>(1);
  
  constructor(private readonly usersService: UsersService) {}
  
  ngOnInit() {
    this.usersService
      .getUsers()
      .pipe(
        map(response => {
          
        }),
        catchError(err => {
          console.log(err)
          
          return of()
        }),
        takeUntil(this.destroyed$)
      )
  }
  
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
