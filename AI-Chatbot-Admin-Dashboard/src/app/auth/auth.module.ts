import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './layouts/login/login.component';
import { AccessComponent } from './layouts/access/access.component';
import { ErrorComponent } from './layouts/error/error.component';
import { SharedModule } from '../shared/shared.module';
import { PrimeModule } from '../prime/prime.module';

@NgModule({
  declarations: [LoginComponent, AccessComponent, ErrorComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, PrimeModule],
})
export class AuthModule {}
