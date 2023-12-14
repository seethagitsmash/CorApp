import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  constructor(private router: Router, private apiService: ApiService) {}

  search: string = '';
  profileList: any[] = [];
  profileListMaster: any[] = [];

  ngOnInit() {
    this.handleUserAuth();

    this.handleAPiCalls();
  }

  handleUserAuth(): void {
    const decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie != 'true') {
      this.router.navigate(['/']);
    }
  }

  handleAPiCalls(): void {
    this.apiService.profileList().subscribe((response) => {
      this.profileList = response;
      this.profileListMaster = response;
    });
  }

  handleNav(path: string): void {
    this.router.navigate([path]);
  }

  handleUserEdit(id: any): void {
    sessionStorage.setItem('edit', id);
    this.handleNav('edit/detail');
  }

  handleSearch(): void {
    const searchWord = this.search?.toLowerCase();

    let foundRow: any = [];
    this.profileListMaster.find((e) => {
      if (
        e.username?.toLowerCase().includes(searchWord) ||
        e.first_name?.toLowerCase().includes(searchWord) ||
        e.last_name?.toLowerCase().includes(searchWord) ||
        e.email_id?.toLowerCase().includes(searchWord) ||
        e.mobile?.toLowerCase().includes(searchWord) ||
        e.status?.toLowerCase().includes(searchWord)
      )
        foundRow.push(e);
    });

    if (foundRow.length) {
      this.profileList = foundRow;
    } else if (this.search === '') {
      this.profileList = this.profileListMaster;
    } else {
      this.profileList = [];
    }
  }
}
