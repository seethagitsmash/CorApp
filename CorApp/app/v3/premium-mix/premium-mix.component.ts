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
      this.trans_id = a.tranId;
      this.new = a.new_car_total;
      this.old = a.old_car_total;
      this.total_gwp = a.car_total;
      this.gwpForPieChart = [a.new_car_total, a.old_car_total, a.car_total];
    }
  }

  trans_id: string = '';
  new: number = 0;
  old: number = 0;
  total_gwp: number = 0;
  gwpForPieChart: number[] = [];

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
