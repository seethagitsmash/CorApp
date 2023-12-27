import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-oldcar-info',
  templateUrl: './oldcar-info.component.html',
  styleUrls: ['./oldcar-info.component.scss'],
})
export class OldcarInfoComponent {
  constructor(private router: Router, private message: NzMessageService) {}
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

  checkError(field: string): boolean {
    const error = this.errorList.filter((e: any) => e.field === field);

    if (error.length) {
      return true;
    }
    return false;
  }

  handleSession(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
      this.router.navigate(['/cor/simulator/selection']);
    } else {
      let a = JSON.parse(cor);

      a.old_ncb = this.old_ncb;
      a.old_non_ncb = this.old_non_ncb;
      a.old_four = this.old_four;
      a.old_ten = this.old_ten;
      a.old_above_ten = this.old_above_ten;

      sessionStorage.setItem('cor', JSON.stringify(a));
    }
  }

  handleSessionReload(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
    } else {
      let a = JSON.parse(cor);
      this.trans_id = a.tranId;
      this.old_gwp = a.old_car_total;
      this.old_non_ncb = +a.old_car_total - +this.old_ncb;
      this.old_above_ten = +a.old_car_total - (+this.old_four + +this.old_ten);

      if ('old_non_ncb' in a) {
        this.old_ncb = a.old_ncb;
        this.old_non_ncb = +a.old_car_total - +a.old_ncb;
        this.old_four = a.old_four;
        this.old_ten = a.old_ten;
        this.old_above_ten = +a.old_car_total - (+a.old_four + +a.old_ten);
      }
    }
  }

  trans_id: string = '';
  errorList: any = [];
  old_gwp: number = 40;
  old_ncb: number = 0;
  old_non_ncb: number = 0;
  old_four: number = 0;
  old_ten: number = 0;
  old_above_ten: number = 0;
  isLoading: boolean = false;

  handleBackPage(): void {
    this.router.navigate(['/cor/btype']);
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

    // Check the tohtal gwp matches with the sum of all ncb inputs
    if (+this.old_gwp !== +this.old_ncb + +this.old_non_ncb) {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
      this.createMessage(
        'error',
        'Sum of ncb and vehicle age must matches with the total GWP.'
      );
      return;
    }

    // Check the total gwp matches with the sum of all vehicle age inputs
    if (this.handleSumMismatch()) {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
      this.createMessage(
        'error',
        'Sum of ncb and vehicle age must matches with the total GWP.'
      );
      return;
    }

    this.handleSession();
    this.router.navigate(['/cor/premium']);
  }

  handleNcbUpdate(): void {
    this.old_non_ncb = this.old_gwp - this.old_ncb;
  }

  handleVaUpdate(): void {
    this.old_above_ten = this.old_gwp - this.old_four - this.old_ten;
  }

  handleErrorField(): boolean {
    let hasError: boolean = false;

    // NCB
    if (+this.old_ncb < 0) {
      this.errorList.push({
        field: 'old_ncb',
      });
      hasError = true;
    }

    // Non- NCB
    if (+this.old_non_ncb < 0) {
      this.errorList.push({
        field: 'old_non_ncb',
      });
      hasError = true;
    }

    // 1-4
    if (+this.old_four < 0) {
      this.errorList.push({
        field: 'old_four',
      });
      hasError = true;
    }

    // 5-10
    if (+this.old_ten < 0) {
      this.errorList.push({
        field: 'old_ten',
      });
      hasError = true;
    }

    // > 10
    if (+this.old_above_ten < 0) {
      this.errorList.push({
        field: 'old_above_ten',
      });
      hasError = true;
    }

    return hasError;
  }

  handleSumMismatch(): boolean {
    let hasError: boolean = false;

    // Check the total gwp matches with the sum of all user input count
    if (
      +this.old_gwp !==
      +this.old_four + +this.old_ten + +this.old_above_ten
    ) {
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

  handleLogout(): void {
    this.router.navigate(['/']);
  }
}
