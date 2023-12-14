import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-rrcs-user-chl-1',
  templateUrl: './rrcs-user-chl-1.component.html',
  styleUrl: './rrcs-user-chl-1.component.scss',
})
export class RrcsUserChl1Component {
  constructor(private router: Router, private apiService: ApiService) {}

  product_code: string[] = [];
  lob: string[] = [];
  migration: string[] = [];
  ageing: string[] = [];
  channel: string[] = [];
  sub_channel: string[] = [];
  branch_code: string[] = [];
  branch_name: string[] = [];
  plan: string[] = [];
  add_on: string[] = [];

  // Select drop down Lists
  productcode: any = '';
  lobList: any = '';
  migrationList: any = '';
  ageingList: any = '';
  channelcode: any = '';
  subchannelOriginal: any[] = [];
  subchannel: any = '';
  branchcode: any = '';
  branchname: any = '';
  planList: any = '';
  addonList: any = '';
  errorList: any[] = [];

  ngOnInit() {
    this.handleUserAuth();
    this.handlePrefillFields();
    this.handleAPiCalls();
  }

  handleUserAuth(): void {
    const decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie != 'true') {
      this.router.navigate(['/']);
    }
  }

  handleAPiCalls(): void {
    this.apiService.productcode().subscribe((response) => {
      this.productcode = response;
    });
    this.apiService.lob().subscribe((response) => {
      this.lobList = response;
    });
    this.apiService.migration().subscribe((response) => {
      this.migrationList = response;
    });
    this.apiService.ageing().subscribe((response) => {
      this.ageingList = response;
    });
    this.apiService.channelcode().subscribe((response) => {
      this.channelcode = response;
    });
    this.apiService.subchannel().subscribe((response) => {
      this.subchannelOriginal = response;

      this.handleChildServiceOf('channel');
    });
    this.apiService.branchcode().subscribe((response) => {
      this.branchcode = response;
    });
    this.apiService.branchname().subscribe((response) => {
      this.branchname = response;
    });
    this.apiService.plan().subscribe((response) => {
      this.planList = response;
    });
    this.apiService.addon().subscribe((response) => {
      this.addonList = response;
    });
  }

  handlePrefillFields(): void {
    let ses = sessionStorage.getItem('profile');

    if (ses !== null) {
      let sess = JSON.parse(ses);
      if ('rrcs1' in sess) {
        this.product_code = sess.rrcs1.product_code;
        this.lob = sess.rrcs1.lob;
        this.migration = sess.rrcs1.migration;
        this.ageing = sess.rrcs1.ageing;
        this.channel = sess.rrcs1.channel;
        this.sub_channel = sess.rrcs1.sub_channel;
        this.branch_code = sess.rrcs1.branch_code;
        this.branch_name = sess.rrcs1.branch_name;
        this.plan = sess.rrcs1.plan;
        this.add_on = sess.rrcs1.add_on;
      }
    }
  }

  isNotSelected(value: string): boolean {
    return this.branch_code.indexOf(value) === -1;
  }

  handleNav(path: string): void {
    if (path === 'profile') {
      const body = {
        product_code: this.product_code,
        lob: this.lob,
        migration: this.migration,
        ageing: this.ageing,
        channel: this.channel,
        sub_channel: this.sub_channel,
        branch_code: this.branch_code,
        branch_name: this.branch_name,
        plan: this.plan,
        add_on: this.add_on,
      };

      console.log(body, 'payload');

      let ses = sessionStorage.getItem('profile');

      if (ses !== null) {
        let sess = JSON.parse(ses);
        sess.rrcs1 = body;
        sessionStorage.setItem('profile', JSON.stringify(sess));
      }
    } else {
      sessionStorage.removeItem('profile');
    }

    this.router.navigate([path]);
  }

  handleNext(): void {
    this.handleValidation();
    if (this.errorList.length) {
      console.log('Field has error...', this.errorList);
      return;
    }

    const body = {
      product_code: this.product_code,
      lob: this.lob,
      migration: this.migration,
      ageing: this.ageing,
      channel: this.channel,
      sub_channel: this.sub_channel,
      branch_code: this.branch_code,
      branch_name: this.branch_name,
      plan: this.plan,
      add_on: this.add_on,
    };

    console.log(body, 'payload');

    let ses = sessionStorage.getItem('profile');

    if (ses !== null) {
      let sess = JSON.parse(ses);
      sess.rrcs1 = body;
      sessionStorage.setItem('profile', JSON.stringify(sess));
      this.router.navigate(['/additional/detail']);
    }
  }

  handleValidation(field: string = ''): boolean {
    if (field === 'product_code' || field === '') {
      if (this.product_code.length === 0) {
        this.errorList.push({
          field: 'product_code',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'lob' || field === '') {
      if (this.lob.length === 0) {
        this.errorList.push({
          field: 'lob',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'migration' || field === '') {
      if (this.migration.length === 0) {
        this.errorList.push({
          field: 'migration',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'ageing' || field === '') {
      if (this.ageing.length === 0) {
        this.errorList.push({
          field: 'ageing',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'channel' || field === '') {
      if (this.channel.length === 0) {
        this.errorList.push({
          field: 'channel',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'sub_channel' || field === '') {
      if (this.sub_channel.length === 0) {
        this.errorList.push({
          field: 'sub_channel',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'branch_code' || field === '') {
      if (this.branch_code.length === 0) {
        this.errorList.push({
          field: 'branch_code',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'branch_name' || field === '') {
      if (this.branch_name.length === 0) {
        this.errorList.push({
          field: 'branch_name',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'plan' || field === '') {
      if (this.plan.length === 0) {
        this.errorList.push({
          field: 'plan',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'add_on' || field === '') {
      if (this.add_on.length === 0) {
        this.errorList.push({
          field: 'add_on',
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

  handleChildServiceOf(whatField: string): void {
    let val: object[] = [];
    let val2: string[] = [];
    if (whatField === 'channel') {
      const subChannelDupli = this.sub_channel;
      this.subchannelOriginal.map((e: any) => {
        if (this.channel.includes(e.channel_list)) val.push(e);
      });

      val.map((e: any) => {
        if (subChannelDupli.includes(e.sub_channel_list))
          val2.push(e.sub_channel_list);
      });

      this.subchannel = val;
      this.sub_channel = val2;
    }
  }
}
