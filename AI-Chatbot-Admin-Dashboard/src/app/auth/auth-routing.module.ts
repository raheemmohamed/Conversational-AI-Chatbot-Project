import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { AccessComponent } from './layouts/access/access.component';
import { ErrorComponent } from './layouts/error/error.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'access-denied', component: AccessComponent },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
