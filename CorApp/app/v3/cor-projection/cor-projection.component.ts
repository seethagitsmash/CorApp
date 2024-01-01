import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cor-projection',
  templateUrl: './cor-projection.component.html',
  styleUrls: ['./cor-projection.component.scss'],
})
export class CorProjectionComponent {
  constructor(
    private router: Router,
    private message: NzMessageService,
    private apiService: ApiService
  ) {}

  trans_id: string = '';
  lr: number = 0;
  dc: number = 0;
  exp: number = 0;
  cor: number = 0;

  lr_3: number = 0;
  dc_3: number = 0;
  exp_3: number = 0;
  cor_3: number = 0;

  yr: any;
  yr_3: any;
  tranId: string = '';
  dealer_name: string = '';
  isLoading: boolean = false;
  isSpinning: boolean = true;

  ngOnInit() {
    this.handleUserAuth();
    this.handleSessionReload();
    this.getProjectedCorDetail();
  }

  handleUserAuth(): void {
    const decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie != 'true') {
      this.router.navigate(['/']);
    }
  }

  getProjectedCorDetail(): void {
    const body = {
      tranId: this.tranId,
      userName: sessionStorage.getItem('user'),
    };

    this.apiService.getProjectedCorDetail(body).subscribe(
      (response: any) => {
        this.isSpinning = false;

        if (response.errMsg !== null) {
          this.createMessage('error', response.errMsg);
          return;
        }

        this.yr = response.data.find((e: any) => {
          if (e.year === '1st Year') return e;
        });
        this.yr_3 = response.data.find((e: any) => {
          if (e.year === '3rd Year') return e;
        });

        this.lr = Math.round(this.yr.lrPerc);
        this.dc = Math.round(this.yr.dcPerc);
        this.exp = Math.round(this.yr.expPerc);
        this.cor = Math.round(this.yr.corPerc);

        this.lr_3 = Math.round(this.yr_3.lrPerc);
        this.dc_3 = Math.round(this.yr_3.dcPerc);
        this.exp_3 = Math.round(this.yr_3.expPerc);
        this.cor_3 = Math.round(this.yr_3.corPerc);
      },
      (error) => {
        this.isSpinning = false;
        this.createMessage('error', 'Failed fetching the data!');
      }
    );
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  handleNextPage(): void {
    this.isLoading = true;
    // this.router.navigate(['/cor/oldcar']);
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
    this.createMessage('success', 'Your request filed for an approval!');
  }

  handleBackPage(): void {
    this.router.navigate(['/cor/summary']);
  }

  handleSessionReload(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
      this.router.navigate(['/cor/simulator/selection']);
    } else {
      let a = JSON.parse(cor);
      this.trans_id = a.tranId;
      // Dealer
      if ('dealer_name' in a) {
        this.dealer_name = a.dealer_name;
        this.tranId = a.tranId;
      }
    }
  }

  handleLogout(): void {
    this.router.navigate(['/']);
  }
}
