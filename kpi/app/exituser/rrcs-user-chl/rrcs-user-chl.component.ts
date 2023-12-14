import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rrcs-user-chl',
  templateUrl: './rrcs-user-chl.component.html',
  styleUrl: './rrcs-user-chl.component.scss',
})
export class RrcsUserChlComponent {
  constructor(private router: Router) {}

  username: string = '';
  kpi_btype: string = '';
  kpi_zone: string = '';
  kpi_product: string = '';
  kpi_sub_product: string = '';
  kpi_branch_code: string = '';
  kpi_fin_year: string = '';
  kpi_channel: string = '';
  kpi_sub_channel: string = '';
  kpi_state: string = '';
  kpi_city: string = '';
  kpi_cluster: string = '';
  kpi_add_on: string = '';

  handleNav(path: string): void {
    this.router.navigate([path]);
  }

  handleButton(step: string): void {
    if (step === 'save') {
      // this.router.navigate(['/detail']);
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['dashboard']);
    }
  }
}
