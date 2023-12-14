import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-rrcs-user-chl-2',
  templateUrl: './rrcs-user-chl-2.component.html',
  styleUrl: './rrcs-user-chl-2.component.scss',
})
export class RrcsUserChl2Component {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private message: NzMessageService
  ) {}

  rrcsid: string = '';
  userid: number = 0;
  username: string = '';
  kpi_btype: string[] = [];
  kpi_zone: string[] = [];
  kpi_product: string[] = [];
  kpi_sub_product: string[] = [];
  kpi_branch_name: string[] = [];
  kpi_fin_year: string[] = [];
  kpi_channel: string[] = [];
  kpi_sub_channel: string[] = [];
  kpi_state: string[] = [];
  kpi_city: string[] = [];
  kpi_cluster: string[] = [];
  kpi_add_on: string[] = [];

  // Select drop down Lists
  kpi_btypes: any = '';
  productcode: any = '';
  kpi_subproducts: any = '';
  channelcode: any = '';
  subchannel: any = '';
  kpi_clusters: any = '';
  kpi_zones_list: any = '';
  kpi_zones_list_master: any = '';
  branchname: any = '';
  kpi_fnyears: any = '';
  kpi_city_list: any = '';
  kpi_city_list_master: any = '';
  kpi_state_list: any = '';
  kpi_state_list_master: any = '';
  addonList: any = '';
  kpi_finyear_list: any = '';
  errorList: any[] = [];

  ngOnInit() {
    this.handleUserAuth();
    this.handleAPiCalls();
    this.handlePrefillFields();
  }

  handleUserAuth(): void {
    const decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie != 'true') {
      this.router.navigate(['/']);
    }
  }

  handleAPiCalls(): void {
    this.apiService.kpi_btype().subscribe((response) => {
      this.kpi_btypes = response;
    });
    this.apiService.productcode().subscribe((response) => {
      this.productcode = response;
    });
    this.apiService.subproduct().subscribe((response) => {
      this.kpi_subproducts = response;
    });
    this.apiService.channelcode().subscribe((response) => {
      this.channelcode = response;
    });
    this.apiService.subchannel().subscribe((response) => {
      this.subchannel = response;
    });
    this.apiService.kpi_clusters().subscribe((response) => {
      this.kpi_clusters = response;
    });
    this.apiService.kpi_zones().subscribe((response) => {
      this.kpi_zones_list_master = response;
      this.handleChildServiceOfCluster();
    });
    this.apiService.branchname().subscribe((response) => {
      this.branchname = response;
    });
    this.apiService.kpi_city_list().subscribe((response) => {
      this.kpi_city_list_master = response;
      this.handleChildServiceOfState();
    });
    this.apiService.kpi_state_list().subscribe((response) => {
      this.kpi_state_list_master = response;
      this.handleChildServiceOfZone();
    });
    this.apiService.addon().subscribe((response) => {
      this.addonList = response;
    });
    this.apiService.kpi_finyear().subscribe((response) => {
      this.kpi_finyear_list = response;
    });
  }

  handlePrefillFields(): void {
    let ses = sessionStorage.getItem('profile');

    if (ses !== null) {
      let sess = JSON.parse(ses);
      this.rrcsid = sess.rrcsid;

      if ('rrcs1' in sess) {
        this.userid = sess.userid;
        this.username = sess.username;
        this.kpi_product = sess.rrcs1.product_code;
        this.kpi_channel = sess.rrcs1.channel;
        this.kpi_sub_channel = sess.rrcs1.sub_channel;
        this.kpi_branch_name = sess.rrcs1.branch_name;
        this.kpi_add_on = sess.rrcs1.add_on;
      }

      if ('rrcs2' in sess) {
        this.kpi_btype = sess.rrcs2.kpi_btype;
        this.kpi_zone = sess.rrcs2.kpi_zone;
        this.kpi_fin_year = sess.rrcs2.kpi_fin_year;
        this.kpi_cluster = sess.rrcs2.kpi_cluster;
        this.kpi_state = sess.rrcs2.kpi_state;
        this.kpi_city = sess.rrcs2.kpi_city;
        this.kpi_sub_product = sess.rrcs2.kpi_sub_product;
      }
    }
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  handleNav(path: string): void {
    if (path === 'edit/detail') {
      const body = {
        // KPI
        kpi_btype: this.kpi_btype,
        kpi_zone: this.kpi_zone,
        kpi_fin_year: this.kpi_fin_year,
        kpi_cluster: this.kpi_cluster,
        kpi_state: this.kpi_state,
        kpi_city: this.kpi_city,
        kpi_sub_product: this.kpi_sub_product,
      };

      let ses = sessionStorage.getItem('profile');

      if (ses !== null) {
        let sess = JSON.parse(ses);
        sess.rrcs2 = body;
        sessionStorage.setItem('profile', JSON.stringify(sess));
      }
    } else {
      sessionStorage.removeItem('edit');
      sessionStorage.removeItem('profile');
    }

    this.router.navigate([path]);
  }

  handleSave(): void {
    let sess: any = {};
    let ses = sessionStorage.getItem('profile');
    if (ses !== null) {
      const a = JSON.parse(ses);
      if ('rrcs1' in a) {
        sess = a.rrcs1;
      }
    }

    let rrcs1: any = '';
    if ('product_code' in sess) {
      rrcs1 = sess;
    }

    const body = {
      // User
      id: this.rrcsid,
      userid: this.userid,
      username: this.username,

      // NON-KPI
      product_code: rrcs1.product_code.join(','),
      lob: rrcs1.lob.join(','),
      migration: rrcs1.migration.join(','),
      ageing: rrcs1.ageing.join(','),
      channel: rrcs1.channel.join(','),
      sub_channel: rrcs1.sub_channel.join(','),
      branch_code: rrcs1.branch_code.join(','),
      branch_name: rrcs1.branch_name.join(','),
      plan: rrcs1.plan.join(','),
      add_on: rrcs1.add_on.join(','),

      // KPI
      kpi_btype: this.kpi_btype.join(','),
      kpi_zone: this.kpi_zone.join(','),
      kpi_product: this.kpi_product.join(','),
      kpi_sub_product: this.kpi_sub_product.join(','),
      kpi_branch_name: this.kpi_branch_name.join(','),
      kpi_fin_year: this.kpi_fin_year.join(','),
      kpi_channel: this.kpi_channel.join(','),
      kpi_sub_channel: this.kpi_sub_channel.join(','),
      kpi_state: this.kpi_state.join(','),
      kpi_city: this.kpi_city.join(','),
      kpi_cluster: this.kpi_cluster.join(','),
      kpi_add_on: this.kpi_add_on.join(','),
    };

    this.apiService.createRrcs(body).subscribe((response: any) => {
      if (response) {
        sessionStorage.removeItem('edit');
        sessionStorage.removeItem('profile');
        this.handleNav('/edit');
        this.createMessage('success', 'Updated successfully!');
      } else {
        this.createMessage('error', 'Updation failed!');
      }
    });
  }

  handleValidation(field: string = ''): boolean {
    if (field === 'kpi_btype' || field === '') {
      if (this.kpi_btype.length === 0) {
        this.errorList.push({
          field: 'kpi_btype',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'kpi_zone' || field === '') {
      if (this.kpi_zone.length === 0) {
        this.errorList.push({
          field: 'kpi_zone',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'kpi_product' || field === '') {
      if (this.kpi_product.length === 0) {
        this.errorList.push({
          field: 'kpi_product',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'kpi_sub_product' || field === '') {
      if (this.kpi_sub_product.length === 0) {
        this.errorList.push({
          field: 'kpi_sub_product',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'kpi_branch_name' || field === '') {
      if (this.kpi_branch_name.length === 0) {
        this.errorList.push({
          field: 'kpi_branch_name',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'kpi_fin_year' || field === '') {
      if (this.kpi_fin_year.length === 0) {
        this.errorList.push({
          field: 'kpi_fin_year',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'kpi_channel' || field === '') {
      if (this.kpi_channel.length === 0) {
        this.errorList.push({
          field: 'kpi_channel',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'kpi_sub_channel' || field === '') {
      if (this.kpi_sub_channel.length === 0) {
        this.errorList.push({
          field: 'kpi_sub_channel',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'kpi_state' || field === '') {
      if (this.kpi_state.length === 0) {
        this.errorList.push({
          field: 'kpi_state',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'kpi_city' || field === '') {
      if (this.kpi_city.length === 0) {
        this.errorList.push({
          field: 'kpi_city',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'kpi_cluster' || field === '') {
      if (this.kpi_cluster.length === 0) {
        this.errorList.push({
          field: 'kpi_cluster',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'kpi_add_on' || field === '') {
      if (this.kpi_add_on.length === 0) {
        this.errorList.push({
          field: 'kpi_add_on',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field) {
      return this.hasFieldErrorExits(field);
    } else {
      return this.errorList.length ? true : false;
    }
  }

  removeErrorList(field: string): void {
    const errorFieldIndex = this.errorList.findIndex((e) => e.field === field);

    if (errorFieldIndex > -1) {
      this.errorList.splice(errorFieldIndex, 1);
      this.removeErrorList(field);
    } else {
      return;
    }
  }

  hasFieldErrorExits(field: string): boolean {
    console.log();
    const hasFieldError = this.errorList.find((e) => e.field === field);
    if (hasFieldError) {
      return true;
    }

    return false;
  }

  handleChildServiceOfCluster(): void {
    let val1: object[] = [];
    let val2: string[] = [];
    let val3: string[] = [];

    this.kpi_zones_list_master.map((e: any) => {
      if (this.kpi_cluster.includes(e.cluster_name) && !val2.includes(e.zone)) {
        val1.push(e);
        val2.push(e.zone);
      }
    });

    const kpiZoneDupli = this.kpi_zone;
    val1.map((e: any) => {
      if (kpiZoneDupli.includes(e.zone)) val3.push(e.zone);
    });

    this.kpi_zones_list = val1;
    this.kpi_zone = val3;
  }

  handleChildServiceOfZone(): void {
    let val1: object[] = [];
    let val2: string[] = [];
    let val3: string[] = [];

    this.kpi_state_list_master.map((e: any) => {
      if (this.kpi_zone.includes(e.zone) && !val2.includes(e.state)) {
        val1.push(e);
        val2.push(e.state);
      }
    });

    const kpiZoneDupli = this.kpi_state;
    val1.map((e: any) => {
      if (kpiZoneDupli.includes(e.state)) val3.push(e.state);
    });

    this.kpi_state_list = val1;
    this.kpi_state = val3;
  }

  handleChildServiceOfState(): void {
    let val1: object[] = [];
    let val2: string[] = [];
    let val3: string[] = [];

    this.kpi_city_list_master.map((e: any) => {
      if (this.kpi_state.includes(e.state) && !val2.includes(e.city)) {
        val1.push(e);
        val2.push(e.city);
      }
    });

    const kpiZoneDupli = this.kpi_city;
    val1.map((e: any) => {
      if (kpiZoneDupli.includes(e.city)) val3.push(e.city);
    });

    this.kpi_city_list = val1;
    this.kpi_city = val3;
  }
}
