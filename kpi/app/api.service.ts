import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // apiUrl = 'http://localhost:8080';
  apiUrl = 'http://rsgitstu80.ind.rsa-ins.com:8080/user_management';

  constructor(private http: HttpClient) {}

  header() {
    let myHeaders = new HttpHeaders();
    myHeaders.append('Accept', 'application/json');
    const header = {
      headers: myHeaders,
    };

    return header;
  }

  // Login
  login(body: any) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/login`, body, header);
  }

  // Fetch records
  branchcode(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/branchcode`, body, header);
  }
  branchname(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/branchname`, body, header);
  }
  channelcode(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/channelcode`, body, header);
  }
  kpi_city_list(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/city`, body, header);
  }
  kpi_clusters(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/clustername`, body, header);
  }
  productcode(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/productcode`, body, header);
  }
  kpi_state_list(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/state`, body, header);
  }
  subchannel(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/subchannel`, body, header);
  }
  subproduct(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/subproduct`, body, header);
  }
  kpi_zones(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/zone`, body, header);
  }
  lob(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/lob`, body, header);
  }
  migration(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/migration`, body, header);
  }
  ageing(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/ageing`, body, header);
  }
  plan(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/plan`, body, header);
  }
  addon(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/addon`, body, header);
  }
  kpi_btype(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/btype`, body, header);
  }
  kpi_finyear(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/finyear`, body, header);
  }

  // Create
  profileList(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/profile/list`, body, header);
  }
  createProfile(body: any) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/createUser`, body, header);
  }
  createRrcs(body: any) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/createRrcs`, body, header);
  }
  getUserRrcs(body: any) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/getUserRrcs`, body, header);
  }
  getCount(body: any = {}) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/getCount`, body, header);
  }
}
