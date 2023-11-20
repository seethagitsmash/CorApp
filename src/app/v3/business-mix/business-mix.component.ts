import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-business-mix',
  templateUrl: './business-mix.component.html',
  styleUrls: ['./business-mix.component.scss'],
})
export class BusinessMixComponent {
  constructor(private router: Router) {}
  ngOnInit() {
    this.handleUserAuth();
  }

  handleUserAuth(): void {
    const decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie != 'true') {
      this.router.navigate(['/']);
    }
  }

  handleNextPage(): void {
    this.router.navigate(['/cor/oldcar']);
  }

  handleBackPage(): void {
    this.router.navigate(['/cor/odtp']);
  }

  handleLogout(): void {
    this.router.navigate(['/']);
  }
}
