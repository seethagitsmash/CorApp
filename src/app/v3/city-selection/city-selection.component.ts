import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';

interface cityList {
  city: string;
  cityCode: string;
  id: number;
  isActive: boolean;
  isKeyCity: boolean;
  state: string;
}

@Component({
  selector: 'app-city-selection',
  templateUrl: './city-selection.component.html',
  styleUrls: ['./city-selection.component.scss'],
})
export class CitySelectionComponent {
  listOfOption: cityList[] = [];
  selectedCity: any = [];
  selectedCityCode: string = '';
  selectedState: string = '';

  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit() {
    this.handleUserAuth();

    this.apiService.getCity().subscribe((data: any) => {
      this.listOfOption = data.cityList;
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
    this.router.navigate(['/cor/simulator/selection']);
  }

  handleNextPage(): void {
    this.handleSession();
    this.router.navigate(['/cor/make']);
  }

  handleCitySelection(city: string): void {
    this.selectedCity = city;
    this.handleNextPage();
  }

  handleSession(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
      console.log(this.selectedCity);
      const aa = this.listOfOption.find((e) => e.city === this.selectedCity);

      if (aa) {
        let a = {
          city: aa.city,
          cityCode: aa.cityCode,
          state: aa.state,
        };
        sessionStorage.setItem('cor', JSON.stringify(a));
      }
    } else {
      let a = JSON.parse(cor);

      const aa = this.listOfOption.find((e) => e.city === this.selectedCity);
      if (aa) {
        (a.city = aa.city), (a.cityCode = aa.cityCode), (a.state = aa.state);
      }

      sessionStorage.setItem('cor', JSON.stringify(a));
    }
  }

  handleSessionReload(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
    } else {
      let a = JSON.parse(cor);
      if ('city' in a) {
        this.selectedCity = a.city;
      }
    }
  }

  handleLogout(): void {
    this.router.navigate(['/']);
  }

  isCityNotSelected(): boolean {
    if (this.selectedCity.length === 0) return true;

    return false;
  }
}
