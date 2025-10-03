import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { MusicPlayerComponent } from './music-player/music-player.component';
import { MusicUploaderComponent } from './music-uploader/music-uploader.component';
import { MusicPlaylistComponent } from './music-playlist/music-playlist.component';

@NgModule({
  declarations: [
    MusicPlayerComponent,
    MusicUploaderComponent,
    MusicPlaylistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    NgFor,
    MatCardModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [
    MusicPlayerComponent,
    MusicUploaderComponent,
    MusicPlaylistComponent
  ]
})
export class MusicModule { }
