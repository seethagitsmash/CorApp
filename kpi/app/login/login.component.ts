import { Route, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router, private apiService: ApiService) {}

  username: string = '';
  password: string = '';

  ngOnInit() {
    document.cookie = 'false';
    sessionStorage.clear();
  }

  handleLogin(): void {
    const body = {
      username: this.username,
      password: this.password,
    };

    this.apiService.login(body).subscribe((response: any) => {
      if (response.success) {
        document.cookie = 'true';
        this.router.navigate(['/dashboard']);
      } else {
        alert(response.error);
      }
    });
  }
}
