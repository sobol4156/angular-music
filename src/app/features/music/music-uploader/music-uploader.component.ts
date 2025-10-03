import { Component } from '@angular/core';
import { AudioPlayerService } from 'src/app/core/audio-player/audio-player.service';

@Component({
  selector: 'app-music-uploader',
  templateUrl: './music-uploader.component.html',
  styleUrls: ['./music-uploader.component.less']
})
export class MusicUploaderComponent {
  selectedFile: File | null = null;

  constructor(public player: AudioPlayerService){}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (!this.selectedFile) return;
    this.player.addTrack(this.selectedFile)
    this.selectedFile = null
  }
}