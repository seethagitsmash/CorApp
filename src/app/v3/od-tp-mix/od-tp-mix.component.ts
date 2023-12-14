import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-od-tp-mix',
  templateUrl: './od-tp-mix.component.html',
  styleUrls: ['./od-tp-mix.component.scss'],
})
export class OdTpMixComponent {
  errorList: any = [];

  new_gwp: number = 0;
  old_gwp: number = 0;

  gwp_od: number = 0;
  gwp_tp: number = 0;
  com_od: number = 0;
  com_tp: string = '--';

  old_gwp_od: number = 0;
  old_gwp_tp: number = 0;
  old_com_od: number = 0;
  old_com_tp: number = 2.0;

  sessData: any;
  newCarSummary: any;
  oldCarSummary: any;
  isSpinning: boolean = true;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private message: NzMessageService,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    this.handleUserAuth();
    this.handleSessionReload();
    this.getOdTpValue();
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
      this.new_gwp = a.new_car_total;
      this.old_gwp = a.old_car_total;
      this.sessData = a;

      if ('old_gwp_od' in a) {
        this.gwp_od = a.gwp_od;
        this.gwp_tp = a.gwp_tp;
        this.old_gwp_od = a.old_gwp_od;
        this.old_gwp_tp = a.old_gwp_tp;

        this.com_od = a.com_od;
        this.com_tp = a.com_tp;
        this.old_com_od = a.old_com_od;
        this.old_com_tp = a.old_com_tp;
      }
    }
  }

  getOdTpValue(): void {
    const body = {
      renewalCompPercentage:
        this.sessData.renewal_comp !== null ? this.sessData.renewal_comp : 0,
      renewalSodPercentage:
        this.sessData.renewal_sod !== null ? this.sessData.renewal_sod : 0,
      rollOverCompPercentage:
        this.sessData.rollover_comp !== null ? this.sessData.rollover_comp : 0,
      rollOverSodPercentage:
        this.sessData.rollover_sod !== null ? this.sessData.rollover_sod : 0,
      tranId: this.sessData.tranId,
      userName: sessionStorage.getItem('user'),
    };

    this.apiService.getOdTpValue(body).subscribe((response: any) => {
      this.isSpinning = false;

      if (response.errMsg !== null) {
        this.createMessage('error', response.errMsg);
        return;
      }

      this.newCarSummary = response.summaryDtlsList.find((e: any) => {
        if (e.carType === 'New Car') return e;
      });
      this.oldCarSummary = response.summaryDtlsList.find((e: any) => {
        if (e.carType === 'Old Car') return e;
      });

      this.gwp_od = +this.newCarSummary.gwpOd;
      this.gwp_tp =
        +this.newCarSummary.gwpTp_1st_Year +
        +this.newCarSummary.gwpTp_2nd_3rd_Year;
      this.old_gwp_od = +this.oldCarSummary.gwpOd;
      // Dont consider 2+3 yr value in total, since 2+3rd yr is not applicable for TP
      this.old_gwp_tp =
        +this.oldCarSummary.gwpTp_1st_Year +
        +this.oldCarSummary.gwpTp_2nd_3rd_Year;

      this.handleErrorField();
    });
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

      a.gwp_od = this.gwp_od;
      a.gwp_tp_1y = +this.newCarSummary.gwpTp_1st_Year;
      a.gwp_tp_3y = +this.newCarSummary.gwpTp_2nd_3rd_Year;

      a.old_gwp_od = this.old_gwp_od;
      a.old_gwp_tp_1y = +this.oldCarSummary.gwpTp_1st_Year;
      a.old_gwp_tp_3y = +this.oldCarSummary.gwpTp_2nd_3rd_Year;

      a.com_od = this.com_od;
      a.com_tp = this.com_tp;
      a.old_com_od = this.old_com_od;
      a.old_com_tp = this.old_com_tp;

      a.thou = +this.newCarSummary.ccLessThan1000;
      a.thou_five = +this.newCarSummary.ccBtw1000To1500;
      a.above_thou_five = +this.newCarSummary.ccLessThan5000;
      a.old_thou = +this.oldCarSummary.ccLessThan1000;
      a.old_thou_five = +this.oldCarSummary.ccBtw1000To1500;
      a.old_above_thou_five = +this.oldCarSummary.ccLessThan5000;

      sessionStorage.setItem('cor', JSON.stringify(a));
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
    this.router.navigate(['/cor/premium']);
  }

  handleNextPage(): void {
    this.isLoading = true;
    if (this.handleErrorField()) {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
      this.createMessage('error', 'Enter all required field values.');
      return;
    }
    this.handleSession();

    this.router.navigate(['/cor/summary']);
  }

  handleErrorField(): boolean {
    this.errorList = [];
    let hasError: boolean = false;

    // // GWP OD
    // if (+this.gwp_od === 0 || +this.gwp_od < 0) {
    //   this.errorList.push({
    //     field: 'gwp_od',
    //   });
    //   hasError = true;
    // }

    // if (+this.gwp_tp === 0 || +this.gwp_tp < 0) {
    //   this.errorList.push({
    //     field: 'gwp_tp',
    //   });
    //   hasError = true;
    // }

    // // GWP TP
    // if (+this.old_gwp_od === 0 || +this.old_gwp_od < 0) {
    //   this.errorList.push({
    //     field: 'old_gwp_od',
    //   });
    //   hasError = true;
    // }

    // if (+this.old_gwp_tp === 0 || +this.old_gwp_tp < 0) {
    //   this.errorList.push({
    //     field: 'old_gwp_tp',
    //   });
    //   hasError = true;
    // }

    // commission
    if (+this.com_od === 0 || +this.com_od < 0) {
      this.errorList.push({
        field: 'com_od',
      });
      hasError = true;
    }

    if (+this.old_com_od === 0 || +this.old_com_od < 0) {
      this.errorList.push({
        field: 'old_com_od',
      });
      hasError = true;
    }

    // if (+this.old_com_tp === 0 || +this.old_com_tp < 0) {
    //   this.errorList.push({
    //     field: 'old_com_tp',
    //   });
    //   hasError = true;
    // }

    return hasError;
  }

  handleLogout(): void {
    this.router.navigate(['/']);
  }
}
