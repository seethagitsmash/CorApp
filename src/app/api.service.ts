import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // apiUrl = 'http://localhost:8080';
  apiUrl = 'http://rsgitstu80.ind.rsa-ins.com:8080/cor_simulator';

  constructor(private http: HttpClient) {}

  header() {
    let myHeaders = new HttpHeaders();
    myHeaders.append('Accept', 'application/json');
    const header = {
      headers: myHeaders,
    };

    return header;
  }

  getGic(body: any) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/get/gic`, body, header);
  }

  getCity() {
    const header = this.header();
    return this.http.get<any[]>(`${this.apiUrl}/get/city`, header);
  }

  getMake() {
    const header = this.header();
    return this.http.get<any[]>(`${this.apiUrl}/get/make`, header);
  }

  save(body: any) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/save/cateria`, body, header);
  }

  getCorCalc(body: any) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/get/cor/calc`, body, header);
  }

  getAllSavedList(body: any) {
    const header = this.header();
    return this.http.post<any[]>(
      `${this.apiUrl}/get/cor/saved/list`,
      body,
      header
    );
  }

  getSavedListDetail(body: any) {
    const header = this.header();
    return this.http.post<any[]>(
      `${this.apiUrl}/get/cor/saved/list/detail`,
      body,
      header
    );
  }

  login(body: any) {
    const header = this.header();
    return this.http.post<any[]>(`${this.apiUrl}/login`, body, header);
  }
}
