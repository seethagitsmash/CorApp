import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-premium-mix',
  templateUrl: './premium-mix.component.html',
  styleUrls: ['./premium-mix.component.scss'],
})
export class PremiumMixComponent {
  constructor(private router: Router) {}
  ngOnInit() {
    this.handleUserAuth();
    this.handleSessionReload();
  }

  handleUserAuth(): void {
    const decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie != 'true') {
      this.router.navigate(['/']);
    }
  }

  handleSessionReload(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
      this.router.navigate(['/cor/simulator/selection']);
    } else {
      let a = JSON.parse(cor);
      this.new = a.new_car_total;
      this.old = a.old_car_total;
      this.total_gwp = a.car_total;
    }
  }

  new: number = 140;
  old: number = 40;
  total_gwp: number = 180;

  handleBackPage(): void {
    this.router.navigate(['/cor/oldcar']);
  }

  handleNextPage(): void {
    this.router.navigate(['/cor/odtp']);
  }

  handleLogout(): void {
    this.router.navigate(['/']);
  }
}
