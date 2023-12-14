import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// new User
import { LoginComponent } from './login/login.component';
import { SelectionComponent } from './selection/selection.component';
import { ProfileComponent } from './newuser/profile/profile.component';
import { RrcsUserChl1Component } from './newuser/rrcs-user-chl-1/rrcs-user-chl-1.component';
import { RrcsUserChl2Component } from './newuser/rrcs-user-chl-2/rrcs-user-chl-2.component';

// Edit user
import { ListComponent } from './exituser/list/list.component';
import { RrcsUserChlComponent } from './exituser/rrcs-user-chl/rrcs-user-chl.component';
import { ProfileComponent as EProfileComponent } from './exituser/profile/profile.component';
import { RrcsUserChl1Component as ERrcsUserChl1Component } from './exituser/rrcs-user-chl-1/rrcs-user-chl-1.component';
import { RrcsUserChl2Component as ERrcsUserChl2Component } from './exituser/rrcs-user-chl-2/rrcs-user-chl-2.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },

  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: SelectionComponent,
    pathMatch: 'full',
  },
  // New User
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
  },
  {
    path: 'detail',
    component: RrcsUserChl1Component,
    pathMatch: 'full',
  },
  {
    path: 'additional/detail',
    component: RrcsUserChl2Component,
    pathMatch: 'full',
  },
  // Edit User
  {
    path: 'edit',
    component: ListComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit/profile',
    component: EProfileComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit/detail',
    component: ERrcsUserChl1Component,
    pathMatch: 'full',
  },
  {
    path: 'edit/additional/detail',
    component: ERrcsUserChl2Component,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
