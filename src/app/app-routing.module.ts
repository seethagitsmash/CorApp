import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinglecriteriaComponent } from './singlecriteria/singlecriteria.component';
import { MulticriteriaComponent } from './multicriteria/multicriteria.component';
import { Multicriteriamodel2Component } from './multicriteriamodel2/multicriteriamodel2.component';
import { SavedListComponent } from './saved-list/saved-list.component';
// import { LoginComponent } from './login/login.component';
import { SavedItemDetailComponent } from './saved-item-detail/saved-item-detail.component';
import { TestscreenComponent } from './testscreen/testscreen.component';

// Version 3.0
import { LoginComponent } from './v3/login/login.component';
import { SimulatorSelectionComponent } from './v3/simulator-selection/simulator-selection.component';
import { CitySelectionComponent } from './v3/city-selection/city-selection.component';
import { MakeSelectionComponent } from './v3/make-selection/make-selection.component';
import { ModelSelectionComponent } from './v3/model-selection/model-selection.component';
import { PremiumMixComponent } from './v3/premium-mix/premium-mix.component';
import { OdTpMixComponent } from './v3/od-tp-mix/od-tp-mix.component';
import { BusinessMixComponent } from './v3/business-mix/business-mix.component';
import { OldcarInfoComponent } from './v3/oldcar-info/oldcar-info.component';
import { SummaryComponent } from './v3/summary/summary.component';
import { CorProjectionComponent } from './v3/cor-projection/cor-projection.component';
import { BtypeStpComponent } from './v3/btype-stp/btype-stp.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },

  // Version 3.0
  {
    path: 'cor/simulator/selection',
    component: SimulatorSelectionComponent,
    pathMatch: 'full',
  },
  {
    path: 'cor/city',
    component: CitySelectionComponent,
    pathMatch: 'full',
  },
  {
    path: 'cor/make',
    component: MakeSelectionComponent,
    pathMatch: 'full',
  },
  {
    path: 'cor/model',
    component: ModelSelectionComponent,
    pathMatch: 'full',
  },
  {
    path: 'cor/btype',
    component: BtypeStpComponent,
    pathMatch: 'full',
  },
  {
    path: 'cor/premium',
    component: PremiumMixComponent,
    pathMatch: 'full',
  },
  {
    path: 'cor/odtp',
    component: OdTpMixComponent,
    pathMatch: 'full',
  },
  {
    path: 'cor/business',
    component: BusinessMixComponent,
    pathMatch: 'full',
  },
  {
    path: 'cor/oldcar',
    component: OldcarInfoComponent,
    pathMatch: 'full',
  },
  {
    path: 'cor/summary',
    component: SummaryComponent,
    pathMatch: 'full',
  },
  {
    path: 'cor/project',
    component: CorProjectionComponent,
    pathMatch: 'full',
  },

  //
  {
    path: 'single/criteria',
    component: SinglecriteriaComponent,
    pathMatch: 'full',
  },
  {
    path: 'multi/criteria/new',
    component: MulticriteriaComponent,
    pathMatch: 'full',
  },
  {
    path: 'multi/criteria',
    component: Multicriteriamodel2Component,
    pathMatch: 'full',
  },
  {
    path: 'multi/criteria/saved/list',
    component: SavedListComponent,
    pathMatch: 'full',
  },
  {
    path: 'multi/criteria/saved/item',
    component: SavedItemDetailComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'test',
    component: TestscreenComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
