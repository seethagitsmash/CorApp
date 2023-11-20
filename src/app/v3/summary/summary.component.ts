import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

interface dealerListImp {
  dealer: string;
  dealerCode: string;
  id: number;
  isActive: boolean;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private message: NzMessageService
  ) {}
  ngOnInit() {
    let currentDate = new Date();
    this.year = currentDate.getFullYear();
    this.month = currentDate.getMonth() + 2;
    this.currentMonth = currentDate.getMonth() + 1;
    this.currentYear = currentDate.getFullYear();

    this.fetchDealer();
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

  fetchDealer(): void {
    this.apiService.getDealer().subscribe((response: any) => {
      if (response.errMsg !== null) {
        this.createMessage('error', 'Fail to fetch dealer details!');
        return;
      }

      this.dealerList = response.dealerMaster;
    });
  }

  // GWP
  gwp_od: number = 0;
  gwp_tp_1y: number = 0;
  gwp_tp_3y: number = 0;
  gwp_total: number = 0;
  old_gwp_od: number = 0;
  old_gwp_tp_1y: number = 0;
  old_gwp_tp_3y: string = 'N/A';
  old_gwp_total: number = 0;

  // Commission
  com_total: number = 0;
  com_od: number = 0;
  com_tp_1y: string = 'N/A';
  com_tp_3y: string = 'N/A';
  old_com_total: number = 0;
  old_com_od: number = 0;
  old_com_tp_1y: number = 0;
  old_com_tp_3y: string = 'N/A';

  // Fuel Type
  diesel: number = 0;
  petrol: number = 0;
  electric: number = 0;
  old_diesel: number = 0;
  old_petrol: number = 0;
  old_electric: number = 0;

  // cc
  thou: number = 0;
  thou_five: number = 0;
  above_thou_five: number = 0;
  old_thou: number = 0;
  old_thou_five: number = 0;
  old_above_thou_five: number = 0;

  // ncb
  old_ncb: number = 0;
  old_non_ncb: number = 0;

  // vehicle age
  old_four: number = 0;
  old_ten: number = 0;
  old_above_ten: number = 0;

  // Dealer
  dealer_name: string = '';
  ba_code: string = '';
  year: number = 2023;
  month: number = 11;
  new_ba_code: string = '';

  dealerList: dealerListImp[] = [];
  sessData: any = '';
  isBaModalVisible: boolean = false;

  errorList: any = [];
  currentYear: number = 0;
  currentMonth: number = 0;
  isSpinning: boolean = false;
  isLoading: boolean = false;

  handleSession(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
      this.router.navigate(['/cor/simulator/selection']);
    } else {
      let a = JSON.parse(cor);

      a.dealer_name = this.dealer_name;
      a.ba_code = this.ba_code;
      a.month = this.month;
      a.year = this.year;

      sessionStorage.setItem('cor', JSON.stringify(a));
    }
  }

  handleSessionReload(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
      this.router.navigate(['/cor/simulator/selection']);
    } else {
      let a = JSON.parse(cor);
      this.sessData = a;

      // GWP
      this.gwp_od = a.gwp_od;
      // this.gwp_tp_1y = a.
      // this.gwp_tp_3y = a.
      // this.gwp_total = a.
      this.old_gwp_od = a.old_gwp_od;
      this.old_gwp_tp_1y = a.old_gwp_tp;
      this.old_gwp_tp_3y = 'N/A';
      this.old_gwp_total = a.old_gwp_od + a.old_gwp_tp;

      // Commission
      this.com_total = a.com_od;
      this.com_od = a.com_od;
      this.com_tp_1y = 'N/A';
      this.com_tp_3y = 'N/A';
      this.old_com_total = a.old_com_od + a.old_com_tp;
      this.old_com_od = a.old_com_od;
      this.old_com_tp_1y = a.old_com_tp;
      this.old_com_tp_3y = 'N/A';

      // // Fuel Type
      this.diesel = a.diesel_total;
      this.petrol = a.petrol_total;
      this.electric = a.electric_total;
      this.old_diesel = a.old_diesel_total;
      this.old_petrol = a.old_petrol_total;
      this.old_electric = a.old_electric_total;

      // // cc
      // this.thou = a.
      // this.thou_five = a.
      // this.above_thou_five = a.
      // this.old_thou = a.
      // this.old_thou_five = a.
      // this.old_above_thou_five = a.

      // ncb
      this.old_ncb = a.old_ncb;
      this.old_non_ncb = a.old_non_ncb;

      // vehicle age
      this.old_four = a.old_four;
      this.old_ten = a.old_ten;
      this.old_above_ten = a.old_above_ten;

      // Dealer
      if ('year' in a) {
        this.dealer_name = a.dealer_name;
        this.ba_code = a.ba_code;
        this.month = a.month;
        this.year = a.year;
      }
    }
  }

  handleBackPage(): void {
    this.router.navigate(['/cor/odtp']);
  }

  saveModel(): void {
    this.isLoading = true;

    if (this.handleValidation()) {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
      this.createMessage('error', 'Enter all required field values.');
      return;
    }

    this.isSpinning = true;

    let body = {
      tranId: this.sessData.tranId,
      userName: sessionStorage.getItem('user'),
      dealerCode: this.ba_code,
      dealerName: this.dealer_name,
      baCode: this.ba_code,
      startMonth: this.month,
      year: this.year,
      summaryDtlsList: [
        {
          // id: 0,
          // createdDate: '2023-11-06T07:23:24.143Z',
          // modifiedDate: '2023-11-06T07:23:24.143Z',

          carType: 'New Car',
          tranId: this.sessData.tranId,

          gwpTotal: this.gwp_total,
          gwpOd: this.gwp_od,
          gwpTp_1st_Year: this.gwp_tp_1y,
          gwpTp_2nd_3rd_Year: this.gwp_tp_3y,

          commissionTotal: this.com_total,
          commissionOd: this.com_od,
          commissionTp_1st_Year: this.com_tp_1y,
          commissionTp_2nd_3rd_Year: this.com_tp_3y,

          fuelList: [
            {
              carType: 'New Car',
              fuelType: 'Diesel',
              fuelVal: this.diesel,
            },
            {
              carType: 'New Car',
              fuelType: 'Petrol',
              fuelVal: this.petrol,
            },
            {
              carType: 'New Car',
              fuelType: 'Electric',
              fuelVal: this.electric,
            },
          ],

          // ccBtw1000To1500: this.,
          // ccLessThan1000: 'string',
          // ccLessThan5000: 'string',

          ncb: 'N/A',
          nonNcb: 'N/A',

          age1To4: 'N/A',
          age5To10: 'N/A',
          ageGrt10: 'N/A',

          sodRenewal: 'N/A',
          sodRollOver: 'N/A',
          compRenewal: 'N/A',
          compRollOver: 'N/A',
        },
        {
          // id: 0,
          // createdDate: '2023-11-06T07:23:24.143Z',
          // modifiedDate: '2023-11-06T07:23:24.143Z',
          carType: 'Old Car',
          tranId: this.sessData.tranId,

          gwpTotal: this.old_gwp_total,
          gwpOd: this.old_gwp_od,
          gwpTp_1st_Year: this.old_gwp_tp_1y,
          gwpTp_2nd_3rd_Year: this.old_gwp_tp_3y,

          commissionTotal: this.old_com_total,
          commissionOd: this.old_com_od,
          commissionTp_1st_Year: this.old_com_tp_1y,
          commissionTp_2nd_3rd_Year: this.old_com_tp_3y,

          fuelList: [
            {
              carType: 'Old Car',
              fuelType: 'Diesel',
              fuelVal: this.old_diesel,
            },
            {
              carType: 'Old Car',
              fuelType: 'Petrol',
              fuelVal: this.old_petrol,
            },
            {
              carType: 'Old Car',
              fuelType: 'Electric',
              fuelVal: this.old_electric,
            },
          ],

          // ccBtw1000To1500: this.,
          // ccLessThan1000: 'string',
          // ccLessThan5000: 'string',

          ncb: this.old_ncb,
          nonNcb: this.old_non_ncb,

          age1To4: this.old_four,
          age5To10: this.old_ten,
          ageGrt10: this.old_above_ten,

          sodRenewal: this.sessData.renewal_sod,
          sodRollOver: this.sessData.rollover_sod,
          compRenewal: this.sessData.renewal_comp,
          compRollOver: this.sessData.rollover_comp,
        },
      ],
    };

    this.apiService.saveUpdateSummary(body).subscribe((response: any) => {
      if (response.errMsg !== null) {
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
        this.createMessage('error', response.errMsg);
      }

      this.handleSession();

      this.router.navigate(['/cor/project']);
    });
  }

  handleValidation(): boolean {
    this.errorList = [];
    let hasError = false;

    if (+this.year === 0 || +this.year < +this.currentYear) {
      this.errorList.push({
        field: 'year',
      });
      hasError = true;
    }

    if (
      +this.month < 1 ||
      (+this.month < +this.currentMonth + 1 &&
        +this.year === +this.currentYear) ||
      +this.month > 12
    ) {
      this.errorList.push({
        field: 'month',
      });
      hasError = true;
    }

    if (this.dealer_name === '' && this.ba_code === '') {
      this.errorList.push({
        field: 'dealer_name',
      });
      hasError = true;
    }

    return hasError;
  }

  checkError(field: string): boolean {
    const error = this.errorList.filter((e: any) => e.field === field);

    if (error.length) {
      return true;
    }
    return false;
  }

  handleModalVisible(): void {
    this.isBaModalVisible = !this.isBaModalVisible;
  }

  handleAddBa(): void {
    console.log();
  }

  handleLogout(): void {
    this.router.navigate(['/']);
  }
}
