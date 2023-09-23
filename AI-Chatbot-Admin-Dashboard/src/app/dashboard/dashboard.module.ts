import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PrimeModule } from '../prime/prime.module';
import { MessageService } from 'primeng/api';
import { OrganizationComponent } from './layouts/organization/organization.component';

@NgModule({
  declarations: [DashboardComponent, OrganizationComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, PrimeModule],
  providers: [MessageService],
})
export class DashboardModule {}
