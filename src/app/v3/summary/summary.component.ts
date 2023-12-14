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
  old_gwp_tp_3y: string = '--';
  old_gwp_total: number = 0;

  // Commission
  com_total: number = 0;
  com_od: number = 0;
  com_tp_1y: string = '--';
  com_tp_3y: string = '--';
  old_com_total: number = 0;
  old_com_od: number = 0;
  old_com_tp_1y: number = 0;
  old_com_tp_3y: string = '--';

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
  ncb: string = '--';
  non_ncb: number = 0;
  old_ncb: number = 0;
  old_non_ncb: number = 0;

  // vehicle age
  four: number = 0;
  ten: string = '--';
  above_ten: string = '--';
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

  monthList: any = [
    {
      name: 'Jan',
      value: 1,
    },
    {
      name: 'Feb',
      value: 2,
    },
    {
      name: 'Mar',
      value: 3,
    },
    {
      name: 'Apr',
      value: 4,
    },
    {
      name: 'May',
      value: 5,
    },
    {
      name: 'Jun',
      value: 6,
    },
    {
      name: 'Jul',
      value: 7,
    },
    {
      name: 'Aug',
      value: 8,
    },
    {
      name: 'Sep',
      value: 9,
    },
    {
      name: 'Oct',
      value: 10,
    },
    {
      name: 'Nov',
      value: 11,
    },
    {
      name: 'Dec',
      value: 12,
    },
  ];

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
      const gwpTotal = +a.gwp_od + +a.gwp_tp_1y + +a.gwp_tp_3y;

      // GWP
      this.gwp_od = a.gwp_od;
      this.gwp_tp_1y = a.gwp_tp_1y;
      this.gwp_tp_3y = a.gwp_tp_3y;
      this.gwp_total = gwpTotal;

      this.old_gwp_od = a.old_gwp_od;
      this.old_gwp_tp_1y = a.old_gwp_tp_1y;
      this.old_gwp_tp_3y = '--';
      this.old_gwp_total = +a.old_gwp_od + +a.old_gwp_tp_1y;

      // Commission
      this.com_od = (+a.gwp_od * +a.com_od) / 100;
      this.com_tp_1y = '--';
      this.com_tp_3y = '--';
      this.com_total = (+a.gwp_od * +a.com_od) / 100;

      this.old_com_od = (+a.old_gwp_od * +a.old_com_od) / 100;
      this.old_com_tp_1y = (+a.old_gwp_tp_1y * +a.old_com_tp) / 100;
      this.old_com_tp_3y = '--';
      this.old_com_total =
        (+a.old_gwp_od * +a.old_com_od) / 100 +
        (+a.old_gwp_tp_1y * +a.old_com_tp) / 100;

      // // Fuel Type
      this.diesel = a.diesel_total;
      this.petrol = a.petrol_total;
      this.electric = a.electric_total;
      this.old_diesel = a.old_diesel_total;
      this.old_petrol = a.old_petrol_total;
      this.old_electric = a.old_electric_total;

      // // cc
      this.thou = a.thou;
      this.thou_five = a.thou_five;
      this.above_thou_five = a.above_thou_five;
      this.old_thou = a.old_thou;
      this.old_thou_five = a.old_thou_five;
      this.old_above_thou_five = a.old_above_thou_five;

      // ncb
      this.non_ncb = gwpTotal;
      this.old_ncb = a.old_ncb !== null ? a.old_ncb : 0;
      this.old_non_ncb = a.old_non_ncb !== null ? a.old_non_ncb : 0;

      // vehicle age
      this.four = gwpTotal;
      this.old_four = a.old_four !== null ? a.old_four : 0;
      this.old_ten = a.old_ten !== null ? a.old_ten : 0;
      this.old_above_ten = a.old_above_ten !== null ? a.old_above_ten : 0;

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

          gwpTotal: this.gwp_total !== null ? this.gwp_total : 0,
          gwpOd: this.gwp_od !== null ? this.gwp_od : 0,
          gwpTp_1st_Year: this.gwp_tp_1y !== null ? this.gwp_tp_1y : 0,
          gwpTp_2nd_3rd_Year: this.gwp_tp_3y !== null ? this.gwp_tp_3y : 0,

          commissionTotal: this.com_total !== null ? this.com_total : 0,
          commissionOd: this.com_od !== null ? this.com_od : 0,
          commissionTp_1st_Year: this.com_tp_1y === '--' ? 0 : this.com_tp_1y,
          commissionTp_2nd_3rd_Year:
            this.com_tp_3y === '--' ? 0 : this.com_tp_3y,

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

          // cc
          ccLessThan1000: this.thou,
          ccBtw1000To1500: this.thou_five,
          ccLessThan5000: this.above_thou_five,

          // ncb
          ncb: 0,
          nonNcb: this.non_ncb,

          age1To4: this.four,
          age5To10: 0,
          ageGrt10: 0,

          sodRenewal: 0,
          sodRollOver: 0,
          compRenewal: 0,
          compRollOver: 0,
        },
        {
          // id: 0,
          // createdDate: '2023-11-06T07:23:24.143Z',
          // modifiedDate: '2023-11-06T07:23:24.143Z',
          carType: 'Old Car',
          tranId: this.sessData.tranId,

          gwpTotal: this.old_gwp_total !== null ? this.old_gwp_total : 0,
          gwpOd: this.old_gwp_od !== null ? this.old_gwp_od : 0,
          gwpTp_1st_Year: this.old_gwp_tp_1y !== null ? this.old_gwp_tp_1y : 0,
          gwpTp_2nd_3rd_Year:
            this.old_gwp_tp_3y === '--' ? 0 : this.old_gwp_tp_3y,

          commissionTotal: this.old_com_total !== null ? this.old_com_total : 0,
          commissionOd: this.old_com_od !== null ? this.old_com_od : 0,
          commissionTp_1st_Year:
            this.old_com_tp_1y !== null ? this.old_com_tp_1y : 0,
          commissionTp_2nd_3rd_Year:
            this.old_com_tp_3y === '--' ? 0 : this.old_com_tp_3y,

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

          // cc
          ccLessThan1000: this.old_thou,
          ccBtw1000To1500: this.old_thou_five,
          ccLessThan5000: this.old_above_thou_five,

          // ncm
          ncb: this.old_ncb !== null ? this.old_ncb : 0,
          nonNcb: this.old_non_ncb !== null ? this.old_non_ncb : 0,

          age1To4: this.old_four !== null ? this.old_four : 0,
          age5To10: this.old_ten !== null ? this.old_ten : 0,
          ageGrt10: this.old_above_ten !== null ? this.old_above_ten : 0,

          sodRenewal:
            this.sessData.renewal_sod !== null ? this.sessData.renewal_sod : 0,
          sodRollOver:
            this.sessData.rollover_sod !== null
              ? this.sessData.rollover_sod
              : 0,
          compRenewal:
            this.sessData.renewal_comp !== null
              ? this.sessData.renewal_comp
              : 0,
          compRollOver:
            this.sessData.rollover_comp !== null
              ? this.sessData.rollover_comp
              : 0,
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
