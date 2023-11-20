import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-cor-projection',
  templateUrl: './cor-projection.component.html',
  styleUrls: ['./cor-projection.component.scss'],
})
export class CorProjectionComponent {
  constructor(private router: Router, private message: NzMessageService) {}

  lr: number = 0;
  dc: number = 0;
  exp: number = 0;
  cor: number = 0;
  dealer_name: string = '';
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

      // Dealer
      if ('dealer_name' in a) {
        this.dealer_name = a.dealer_name;
      }
    }
  }

  handleLogout(): void {
    this.router.navigate(['/']);
  }
}
