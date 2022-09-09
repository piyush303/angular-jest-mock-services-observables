import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { createSpyFromClass, Spy } from 'jest-auto-spies';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';
import { UsersService } from './services/users.service';
import { User } from './services/user.model';

describe('AppComponent', () => {
  let component: AppComponent;
  const user: User = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    } 
  }
  let isApiFailed = false;
  const usersService: Spy<UsersService> = createSpyFromClass(UsersService);
  
  const options = {
    imports: [
      RouterTestingModule,
      HttpClientTestingModule
    ],
    providers: [
      {
        provide: UsersService,
        useValue: usersService
      }
    ],
    componentProperties: {
      isApiFailed
    }
  }
    
  beforeEach(async () => {  
    const result = await render(AppComponent, options);
		component = result.fixture.componentInstance;
  });

  it('should Success API call and render user info', () => {
    usersService.getUserById.mockReturnValue(of(user));
    
    const showUserButton = screen.getByTestId('show-user-details-button');
    userEvent.click(showUserButton);
    
    const userId = screen.getByTestId('user-id');
    const userName = screen.getByTestId('user-name');
    const userUserName = screen.getByTestId('user-username');
    const userEmail = screen.getByTestId('user-email');
    
    expect(userId.textContent).toBe(user.id.toString());
    expect(userName.textContent).toBe(user.name);
    expect(userUserName.textContent).toBe(user.username);
    expect(userEmail.textContent).toBe(user.email);
  });
  
  it('should Fail API call and render fail info', () => {
    usersService.getUserById.mockReturnValue(of({}))
    
    const showUserButton = screen.getByTestId('show-user-details-button');
    userEvent.click(showUserButton);
    
    component.isApiFailed = true;
    
    const failedInfo = screen.getByTestId('failed-info');
    
    expect(failedInfo.textContent).toBe('Failed to fetch user. Please try again.')
  });
});
