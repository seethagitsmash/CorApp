import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-simulator-selection',
  templateUrl: './simulator-selection.component.html',
  styleUrls: ['./simulator-selection.component.scss'],
})
export class SimulatorSelectionComponent {
  isLoading: boolean = false;

  constructor(private router: Router, private message: NzMessageService) {}
  ngOnInit() {
    this.handleUserAuth();
    sessionStorage.removeItem('cor');
  }

  handleUserAuth(): void {
    const decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie != 'true') {
      this.handleLogout();
    }
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  handleNextPage(to: String): void {
    if (to === 'single') this.router.navigate(['/cor/city']);

    if (to === 'multi') {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
      this.createMessage('error', 'Under Development!');
    }
  }

  handleLogout(): void {
    this.router.navigate(['/']);
  }
}
