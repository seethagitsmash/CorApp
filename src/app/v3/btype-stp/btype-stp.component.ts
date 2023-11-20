import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-btype-stp',
  templateUrl: './btype-stp.component.html',
  styleUrls: ['./btype-stp.component.scss'],
})
export class BtypeStpComponent {
  constructor(private router: Router, private message: NzMessageService) {}

  errorList: any = [];
  old_gwp: number = 0;
  renewal: number = 0;
  rollover: number = 0;
  renewal_sod: number = 0;
  renewal_comp: number = 0;
  rollover_sod: number = 0;
  rollover_comp: number = 0;
  isLoading: boolean = false;

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

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  handleSession(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
      this.router.navigate(['/cor/simulator/selection']);
    } else {
      let a = JSON.parse(cor);
      a.renewal = this.renewal;
      a.rollover = this.rollover;
      a.renewal_sod = this.renewal_sod;
      a.renewal_comp = this.renewal_comp;
      a.rollover_sod = this.rollover_sod;
      a.rollover_comp = this.rollover_comp;
      sessionStorage.setItem('cor', JSON.stringify(a));
    }
  }

  handleSessionReload(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
      this.router.navigate(['/cor/simulator/selection']);
    } else {
      let a = JSON.parse(cor);
      this.old_gwp = a.old_car_total;
      this.rollover = +this.old_gwp - +this.renewal;
      this.renewal_comp = +this.renewal - +this.renewal_sod;
      this.rollover_comp = +this.rollover - +this.rollover_sod;

      if ('renewal' in a) {
        this.renewal = a.renewal;
        this.rollover = a.rollover;
        this.renewal_sod = a.renewal_sod;
        this.renewal_comp = a.renewal_comp;
        this.rollover_sod = a.rollover_sod;
        this.rollover_comp = a.rollover_comp;
      }
    }
  }

  checkError(field: string): boolean {
    const error = this.errorList.filter((e: any) => e.field === field);

    if (error.length) {
      return true;
    }
    return false;
  }

  handleBackPage(): void {
    this.router.navigate(['/cor/model']);
  }

  handleNextPage(): void {
    this.errorList = [];
    this.isLoading = true;

    if (this.handleErrorField()) {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
      this.createMessage('error', 'Enter valid value on all required fields.');
      return;
    }

    if (this.handleSumMismatch()) {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
      this.createMessage(
        'error',
        'Sum of business type inputs must matches with the total GWP.'
      );
      return;
    }

    this.handleSession();
    this.router.navigate(['/cor/oldcar']);
  }

  handleErrorField(): boolean {
    let hasError: boolean = false;

    if (+this.renewal === 0 || +this.renewal < 0) {
      this.errorList.push({
        field: 'renewal',
      });
      hasError = true;
    }
    if (+this.rollover === 0 || +this.rollover < 0) {
      this.errorList.push({
        field: 'rollover',
      });
      hasError = true;
    }

    if (+this.renewal_sod < 0) {
      this.errorList.push({
        field: 'renewal_sod',
      });
      hasError = true;
    }
    if (+this.renewal_comp < 0) {
      this.errorList.push({
        field: 'renewal_comp',
      });
      hasError = true;
    }
    if (+this.rollover_sod < 0) {
      this.errorList.push({
        field: 'rollover_sod',
      });
      hasError = true;
    }
    if (+this.rollover_comp < 0) {
      this.errorList.push({
        field: 'rollover_comp',
      });
      hasError = true;
    }

    return hasError;
  }

  handleSumMismatch(): boolean {
    let hasError: boolean = false;

    // Check the total gwp matches with the sum of all user input count
    if (+this.old_gwp !== +this.renewal + +this.rollover) {
      this.errorList.push({
        field: 'renewal',
      });
      this.errorList.push({
        field: 'rollover',
      });
      hasError = true;
    }

    return hasError;
  }

  handleAutoUpdate(): void {
    this.rollover = +this.old_gwp - +this.renewal;
    this.renewal_comp = +this.renewal - +this.renewal_sod;
    this.rollover_comp = +this.rollover - +this.rollover_sod;
  }

  handleLogout(): void {
    this.router.navigate(['/']);
  }
}
