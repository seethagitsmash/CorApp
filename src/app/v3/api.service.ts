import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface getModel {
  make: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  // apiUrl = 'http://localhost:8084/';
  apiUrl = 'http://rsgitstm198:8084/';

  constructor(private http: HttpClient) {}

  header() {
    let myHeaders = new HttpHeaders();
    myHeaders.append('Accept', 'application/json');
    const header = {
      headers: myHeaders,
    };

    return header;
  }

  login(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(
      `${this.apiUrl}user/authenticateUser`,
      body,
      header
    );
  }

  getCity(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(
      `${this.apiUrl}master/fetchCityMasterDetails`,
      body,
      header
    );
  }

  getMake(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(
      `${this.apiUrl}master/fetchMakeMasterDetails`,
      body,
      header
    );
  }

  getModel(body: getModel) {
    const header = this.header();
    return this.http.post<any[]>(
      `${this.apiUrl}master/fetchModelOnMakeSelection`,
      body,
      header
    );
  }

  saveUpdateModelWiseGwp(body: any) {
    const header = this.header();
    return this.http.post<any[]>(
      `${this.apiUrl}corSimulator/saveOrUpdateModelWiseGwpDtls`,
      body,
      header
    );
  }

  getOdTpValue(body: any) {
    const header = this.header();
    return this.http.post<any[]>(
      `${this.apiUrl}corSimulator/calculateOdTpDetails`,
      body,
      header
    );
  }

  getDealer(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(
      `${this.apiUrl}master/fetchDealerDetails`,
      body,
      header
    );
  }

  saveUpdateSummary(body: any) {
    const header = this.header();
    return this.http.post<any[]>(
      `${this.apiUrl}corSimulator/saveAndUpdateSummary`,
      body,
      header
    );
  }

  getProjectedCorDetail(body: any) {
    const header = this.header();
    return this.http.post<any[]>(
      `${this.apiUrl}corSimulator/projectedCORData`,
      body,
      header
    );
  }
}
