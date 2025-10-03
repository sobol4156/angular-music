import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AudioPlayerService, Track } from 'src/app/core/audio-player/audio-player.service';

@Component({
  selector: 'app-music-playlist',
  templateUrl: './music-playlist.component.html',
  styleUrls: ['./music-playlist.component.less']
})
export class MusicPlaylistComponent implements OnInit, OnDestroy {
  tracks: Track[] = [];
  private tracksSub?: Subscription;

  constructor(public player: AudioPlayerService) { }

  ngOnInit(): void {
    this.tracksSub = this.player.tracks$.subscribe(tracks => {
      this.tracks = tracks;
    });

    this.loadTracks();
  }

  ngOnDestroy(): void {
    this.tracksSub?.unsubscribe();
  }

  loadTracks() {
    this.tracks = this.player.showLoadedTracks();
  }

  isPlaying(index: number): boolean {
    return this.player.currentAudio === index && !this.player.audio.paused;
  }

  playTrack(index: number) {
    let isMatches = false

    if (this.player.currentAudio === index) {
      isMatches = true
    }

    if (isMatches) {
      this.player.togglePlay()
    } else {
      this.player.currentAudio = index;
      this.player.setTrack(index);
      this.player.play()
    }

    isMatches = false
  }

  removeTrack(index: number) {
    this.player.removeTrack(index)
    this.player.setTrack()
    this.loadTracks()
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach(file => this.player.addTrack(file));
    this.loadTracks();
  }
}
