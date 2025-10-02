import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  audio = new Audio();
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 100;
  isDragging = false;
  currentAudio = 0;

  playlist = [
    'assets/music/korol-i-shyt.mp3',
    'assets/music/planeta-9.mp3',
    'assets/music/anna-asti.mp3',
    'assets/music/artur-pirojkov.mp3',
    'assets/music/gayazov.mp3',
  ];

  constructor() {
    this.audio.src = this.playlist[this.currentAudio];
    this.audio.volume = this.volume / 100;

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration;
    });

    this.audio.addEventListener('timeupdate', () => {
      if (!this.isDragging) {
        this.currentTime = this.audio.currentTime;
      }
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  nextAudio() {
    this.clearAudioParams();
    this.currentAudio++;
    this.audio.src = this.playlist[this.currentAudio % this.playlist.length];
    this.audio.play();
    this.isPlaying = true;
  }

  prevAudio() {
    this.clearAudioParams();
    this.currentAudio =
      (this.currentAudio - 1 + this.playlist.length) % this.playlist.length;
    this.audio.src = this.playlist[this.currentAudio];
    this.audio.play();
    this.isPlaying = true;
  }

  clearAudioParams() {
    this.currentTime = 0;
    this.isDragging = false;
  }

  onTimeChange() {
    this.isDragging = true;
  }

  onTimeChangeEnd() {
    this.isDragging = false;
    this.audio.currentTime = this.currentTime;
  }

  onVolumeChange() {
    this.audio.volume = this.volume / 100;
  }

  formatTime(seconds: number) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }
}
