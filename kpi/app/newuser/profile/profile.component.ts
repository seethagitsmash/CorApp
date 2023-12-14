import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private message: NzMessageService
  ) {}

  employee_id: string = '';
  username: string = '';
  first_name: string = '';
  last_name: string = '';
  email_id: string = '';
  mobile: string = '';
  password: string = '';
  capacity: number = 0;
  // status: string = '';

  //
  errorList: any[] = [];
  isSaved: boolean = false;
  usernameServiceError: string = '';
  employeeServiceError: string = '';
  emailServiceError: string = '';
  mobileServiceError: string = '';

  // regex
  mailRegex: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  mobileRegex: any = /^([0|\+[0-9]{10})$/;

  ngOnInit() {
    this.handleUserAuth();
    this.handlePrefillFields();
    sessionStorage.removeItem('edit');
  }

  handleUserAuth(): void {
    const decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie != 'true') {
      this.router.navigate(['/']);
    }
  }

  handlePrefillFields(): void {
    let ses = sessionStorage.getItem('profile');

    if (ses !== null) {
      let sess = JSON.parse(ses);
      if (sess.password) {
        this.isSaved = true;
        this.employee_id = sess.employee_id;
        this.username = sess.username;
        this.first_name = sess.first_name;
        this.last_name = sess.last_name;
        this.email_id = sess.email_id;
        this.mobile = sess.mobile;
        this.password = sess.password;
        //this.status = sess.status;
        this.capacity = sess.capacity;
      }
    }
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  handleNav(path: string): void {
    if (path !== 'detail') {
      sessionStorage.removeItem('profile');
    }

    this.router.navigate([path]);
  }

  handleSubmit(): void {
    this.handleValidation();
    if (this.errorList.length) {
      console.log('Error', this.errorList);
      return;
    }

    let ses = sessionStorage.getItem('profile');
    let sess: any = '';
    if (ses !== null) {
      sess = JSON.parse(ses);
    }

    const body = {
      employee_id: this.employee_id,
      username: this.username,
      first_name: this.first_name,
      last_name: this.last_name,
      email_id: this.email_id,
      mobile: this.mobile,
      password: this.password,
      // status: this.status,
      capacity: this.capacity,
      auth_user: 'System',
      userid: null,
    };

    this.usernameServiceError = '';
    this.employeeServiceError = '';
    this.emailServiceError = '';
    this.mobileServiceError = '';

    this.apiService.createProfile(body).subscribe((response: any) => {
      console.log(response.errorMessage);

      if (
        response.errorMessage === null ||
        response.errorMessage === 'null' ||
        response.errorMessage === ''
      ) {
        body.userid = response.userid;

        sessionStorage.setItem('profile', JSON.stringify(body));
        this.router.navigate(['/detail']);
        this.createMessage('success', 'Profile got created successfully!');
      } else {
        if (response.errorMessage === 'Username')
          this.usernameServiceError = 'Username is already exits!';
        if (response.errorMessage === 'Employee Id')
          this.employeeServiceError = 'Employee id is already exits!';
        if (response.errorMessage === 'Email')
          this.emailServiceError = 'Email is already exits!';
        if (response.errorMessage === 'Mobile')
          this.mobileServiceError = 'Mobile is already exits!';
      }
    });
  }

  handleValidation(field: string = ''): boolean {
    if (field === 'employee_id' || field === '') {
      if (this.employee_id === '') {
        this.errorList.push({
          field: 'employee_id',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'username' || field === '') {
      if (this.username === '') {
        this.errorList.push({
          field: 'username',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'first_name' || field === '') {
      if (this.first_name === '') {
        this.errorList.push({
          field: 'first_name',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'last_name' || field === '') {
      if (this.last_name === '') {
        this.errorList.push({
          field: 'last_name',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'email_id' || field === '') {
      if (this.email_id === '') {
        this.errorList.push({
          field: 'email_id',
          error: 'Please enter value',
        });
      } else if (!this.mailRegex.test(this.email_id)) {
        this.emailServiceError = 'Not a valid email address';
      } else if (this.mailRegex.test(this.email_id)) {
        this.emailServiceError = '';
        this.removeErrorList(field);
      }
    }

    if (field === 'mobile' || field === '') {
      if (this.mobile === '') {
        this.errorList.push({
          field: 'mobile',
          error: 'Please enter value',
        });
      } else if (!this.mobileRegex.test(this.mobile)) {
        this.mobileServiceError = 'Not a valid mobile number';
      } else if (this.mobileRegex.test(this.mobile)) {
        this.mobileServiceError = '';
        this.removeErrorList(field);
      }
    }

    if (field === 'password' || field === '') {
      if (this.password === '') {
        this.errorList.push({
          field: 'password',
          error: 'Please enter value',
        });
      } else {
        this.removeErrorList(field);
      }
    }

    if (field === 'capacity' || field === '') {
      if (this.capacity === 0 || this.capacity === null) {
        this.errorList.push({
          field: 'capacity',
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
}
