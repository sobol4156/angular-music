import { NgModule } from '@angular/core';
import { HomePage } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MusicModule } from 'src/app/features/music/music.module';

@NgModule({
  declarations: [HomePage],
  imports: [HomeRoutingModule, MusicModule]
})
export class HomeModule { }
