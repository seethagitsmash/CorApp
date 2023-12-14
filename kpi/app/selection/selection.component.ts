import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss',
})
export class SelectionComponent {
  constructor(private router: Router, private apiService: ApiService) {}

  userCount: string = '';
  activeUserCount: string = '';

  ngOnInit() {
    this.handleUserAuth();
    this.handleApiCall();
  }

  handleUserAuth(): void {
    const decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie != 'true') {
      this.router.navigate(['/']);
    }
  }

  handleApiCall(): void {
    this.apiService.getCount().subscribe((response: any) => {
      this.userCount = response.userCount;
      this.activeUserCount = response.activeUserCount;
    });
  }

  handleNav(path: string): void {
    this.router.navigate([path]);
  }
}
