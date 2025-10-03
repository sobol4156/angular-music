import { NgModule } from '@angular/core';
import { HomePage } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MusicModule } from 'src/app/features/music/music.module';
import { PulseCanvasModule } from 'src/app/features/canvas-pulse/canvas-pulse.module';

@NgModule({
  declarations: [HomePage],
  imports: [HomeRoutingModule, MusicModule, PulseCanvasModule]
})
export class HomeModule { }
