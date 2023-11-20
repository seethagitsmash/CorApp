import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';

interface makeStruc {
  id: number;
  make: string;
  makeCode: string;
  city: string;
  cityId: string;
  isActive: boolean;
  isKeyMake: boolean;
}

@Component({
  selector: 'app-make-selection',
  templateUrl: './make-selection.component.html',
  styleUrls: ['./make-selection.component.scss'],
})
export class MakeSelectionComponent {
  listOfOption: makeStruc[] = [];
  topOrderMake: makeStruc[] = [];
  selectedMake: any = [];

  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit() {
    this.handleUserAuth();

    this.apiService.getMake().subscribe((data: any) => {
      this.listOfOption = data.makeList;
      let a = data.makeList;
      this.topOrderMake = a.slice(0, 15);
    });

    this.handleSessionReload();
  }

  handleUserAuth(): void {
    const decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie != 'true') {
      this.router.navigate(['/']);
    }
  }

  handleBackPage(): void {
    this.router.navigate(['/cor/city']);
  }

  handleNextPage(): void {
    this.handleSession();
    this.router.navigate(['/cor/model']);
  }

  handleMakeSelection(make: string): void {
    this.selectedMake = make;
    this.handleNextPage();
  }

  handleSession(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
      this.router.navigate(['/cor/simulator/selection']);
    } else {
      let a = JSON.parse(cor);
      a.make = this.selectedMake;
      sessionStorage.setItem('cor', JSON.stringify(a));
    }
  }

  handleSessionReload(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
      this.router.navigate(['/cor/simulator/selection']);
    } else {
      let a = JSON.parse(cor);
      if ('make' in a) {
        this.selectedMake = a.make;
      }
    }
  }

  handleLogout(): void {
    this.router.navigate(['/']);
  }

  isMakeNotSelected(): boolean {
    if (this.selectedMake.length === 0) return true;

    return false;
  }
}
