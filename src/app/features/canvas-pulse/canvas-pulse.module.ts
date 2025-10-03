import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PulseCanvasComponent } from './canvas-pulse.component';

@NgModule({
  declarations: [
    PulseCanvasComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PulseCanvasComponent
  ]
})
export class PulseCanvasModule { }
