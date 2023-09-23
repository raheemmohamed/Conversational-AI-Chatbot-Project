import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './layouts/layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppMenuitemComponent } from './components/menu/app.menuitem.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FooterComponent,
    TopbarComponent,
    SidebarComponent,
    MenuComponent,
    LayoutComponent,
    AppMenuitemComponent,
    NotfoundComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule, SharedModule],
  exports: [
    FooterComponent,
    TopbarComponent,
    SidebarComponent,
    MenuComponent,
    LayoutComponent,
    NotfoundComponent,
  ],
})
export class CoreModule {}
