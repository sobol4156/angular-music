import { MatSliderModule } from '@angular/material/slider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MusicPlayerComponent
  ],
  imports: [
    CommonModule, MatIconModule, MatSliderModule, FormsModule
  ],
  exports: [
    MusicPlayerComponent
  ]
})
export class MusicModule { }
