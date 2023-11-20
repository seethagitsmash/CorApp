import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private message: NzMessageService
  ) {}
  ngOnInit() {
    document.cookie = 'false';
    sessionStorage.clear();
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  pwd: string = '';
  userName: string = '';
  isLoading: boolean = false;

  handleAuthentication(): void {
    this.isLoading = true;
    if (this.userName === '') {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
      this.createMessage('error', 'Username is required.');
      return;
    }

    if (this.pwd === '') {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
      this.createMessage('error', 'Password is required.');
      return;
    }

    let body = {
      userName: this.userName,
      pwd: this.pwd,
    };

    this.apiService.login(body).subscribe(
      (response: any) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
        if (response.errMsg !== null) {
          this.createMessage('error', response.errMsg);
        }

        if (response.successMsg === 'LoggedIn Successfully!!') {
          document.cookie = 'true';
          sessionStorage.setItem('user', response.userName);
          this.router.navigate(['/cor/simulator/selection']);
        }
      },
      (error) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
        this.createMessage(
          'error',
          'Login Failed! Could not login. Try again!'
        );
      }
    );
  }
}
