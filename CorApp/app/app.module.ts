import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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

// antd
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { MulticriteriaComponent } from './multicriteria/multicriteria.component';
import { SinglecriteriaComponent } from './singlecriteria/singlecriteria.component';
import { Multicriteriamodel2Component } from './multicriteriamodel2/multicriteriamodel2.component';
// import { LoginComponent } from './login/login.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SavedListComponent } from './saved-list/saved-list.component';
import { SavedItemDetailComponent } from './saved-item-detail/saved-item-detail.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TestscreenComponent } from './testscreen/testscreen.component';

//
import { LoginComponent } from './v3/login/login.component';
import { SelectionComponent } from './v3/selection/selection.component';
import { SimulatorSelectionComponent } from './v3/simulator-selection/simulator-selection.component';
import { MakeSelectionComponent } from './v3/make-selection/make-selection.component';
import { CitySelectionComponent } from './v3/city-selection/city-selection.component';
import { PremiumMixComponent } from './v3/premium-mix/premium-mix.component';
import { OdTpMixComponent } from './v3/od-tp-mix/od-tp-mix.component';
import { BusinessMixComponent } from './v3/business-mix/business-mix.component';
import { OldcarInfoComponent } from './v3/oldcar-info/oldcar-info.component';
import { SummaryComponent } from './v3/summary/summary.component';
import { CorProjectionComponent } from './v3/cor-projection/cor-projection.component';
import { CommonComponent } from './v3/common/common.component';
import { ModelSelectionComponent } from './v3/model-selection/model-selection.component';
import { BtypeStpComponent } from './v3/btype-stp/btype-stp.component';

@NgModule({
  declarations: [
    AppComponent,
    MulticriteriaComponent,
    SinglecriteriaComponent,
    Multicriteriamodel2Component,
    LoginComponent,
    SavedListComponent,
    SavedItemDetailComponent,
    TestscreenComponent,
    SelectionComponent,
    SimulatorSelectionComponent,
    MakeSelectionComponent,
    CitySelectionComponent,
    PremiumMixComponent,
    OdTpMixComponent,
    BusinessMixComponent,
    OldcarInfoComponent,
    SummaryComponent,
    CorProjectionComponent,
    CommonComponent,
    ModelSelectionComponent,
    BtypeStpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NzTableModule,
    NzSelectModule,
    NzDropDownModule,
    NzButtonModule,
    NzModalModule,
    NzIconModule,
    BrowserAnimationsModule,
    NzSpinModule,
    HttpClientModule,
    NzCollapseModule,
    NzMessageModule,
    NzCardModule,
    NzGridModule,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [CommonComponent],
})
export class AppModule {}
