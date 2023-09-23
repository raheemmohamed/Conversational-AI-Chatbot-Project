import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from './pipes/pipes/truncate.pipe';
import { LoadingMaskComponent } from './components/loading-mask/loading-mask.component';
import { PrimeModule } from '../prime/prime.module';

@NgModule({
  declarations: [TruncatePipe, LoadingMaskComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeModule,
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TruncatePipe,
    LoadingMaskComponent,
  ],
})
export class SharedModule {}
