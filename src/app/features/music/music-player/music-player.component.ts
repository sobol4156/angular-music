import { Component } from '@angular/core';
import { AudioPlayerService } from 'src/app/core/audio-player/audio-player.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.less']
})
export class MusicPlayerComponent {
  constructor(public player: AudioPlayerService) { }

  togglePlay() { this.player.togglePlay(); }
  nextAudio() { this.player.nextAudio(); }
  prevAudio() { this.player.prevAudio(); }
  onTimeChange() { this.player.onTimeChange(); }
  onTimeChangeEnd() { this.player.onTimeChangeEnd(); }
  onVolumeChange() { this.player.onVolumeChange(); }
  formatTime(seconds: number) { return this.player.formatTime(seconds); }
}
