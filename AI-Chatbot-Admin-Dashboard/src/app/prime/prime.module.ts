import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { ChipsModule } from 'primeng/chips';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    OverlayPanelModule,
    TableModule,
    RippleModule,
    DropdownModule,
    DialogModule,
    RadioButtonModule,
    FileUploadModule,
    AutoCompleteModule,
    ToastModule,
    ChipModule,
    ChipsModule,
    TagModule,
    ClipboardModule,
    ProgressSpinnerModule,
  ],
  exports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    OverlayPanelModule,
    TableModule,
    RippleModule,
    DropdownModule,
    DialogModule,
    RadioButtonModule,
    FileUploadModule,
    AutoCompleteModule,
    ToastModule,
    ChipModule,
    ChipsModule,
    TagModule,
    ClipboardModule,
    ProgressSpinnerModule,
  ],
})
export class PrimeModule {}
