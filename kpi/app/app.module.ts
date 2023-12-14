/** import all locales data **/
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import ta from '@angular/common/locales/ta';
import zh from '@angular/common/locales/zh';
registerLocaleData(en);
registerLocaleData(ta);
registerLocaleData(zh);

/** config ng-zorro-antd i18n **/
import { en_US, NZ_I18N, fr_FR, ta_IN } from 'ng-zorro-antd/i18n';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SelectionComponent } from './selection/selection.component';
// New Profile creation
import { ProfileComponent } from './newuser/profile/profile.component';
import { RrcsUserChl1Component } from './newuser/rrcs-user-chl-1/rrcs-user-chl-1.component';
import { RrcsUserChl2Component } from './newuser/rrcs-user-chl-2/rrcs-user-chl-2.component';
// Exit profile update
import { ListComponent } from './exituser/list/list.component';
import { RrcsUserChlComponent } from './exituser/rrcs-user-chl/rrcs-user-chl.component';
import { RrcsUserChl1Component as ERrcsUserChl1Component } from './exituser/rrcs-user-chl-1/rrcs-user-chl-1.component';
import { RrcsUserChl2Component as ERrcsUserChl2Component } from './exituser/rrcs-user-chl-2/rrcs-user-chl-2.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    LoginComponent,
    ProfileComponent,
    SelectionComponent,
    RrcsUserChlComponent,
    RrcsUserChl1Component,
    RrcsUserChl2Component,
    ERrcsUserChl1Component,
    ERrcsUserChl2Component,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzSelectModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: NZ_I18N,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          /** keep the same with angular.json/i18n/locales configuration **/
          case 'ta':
            return ta_IN;
          case 'fr':
            return fr_FR;
          default:
            return en_US;
        }
      },
      deps: [LOCALE_ID],
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
