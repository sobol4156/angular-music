import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Track {
  id: number | symbol;
  url: string;
  name?: string;
}
@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  audio = new Audio();
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 100;
  isDragging = false;
  currentAudio = 0;

  public playlist: Track[] = [
    { id: 1, name: 'Korol i Shyt', url: 'assets/music/korol-i-shyt.mp3' },
    { id: 2, name: 'Planeta 9', url: 'assets/music/planeta-9.mp3' },
    { id: 3, name: 'Anna Asti', url: 'assets/music/anna-asti.mp3' },
    { id: 4, name: 'Artur Pirojkov', url: 'assets/music/artur-pirojkov.mp3' },
    { id: 5, name: 'Gayazov', url: 'assets/music/gayazov.mp3' },
  ];

  private tracksSubject = new BehaviorSubject<Track[]>([]);
  tracks$ = this.tracksSubject.asObservable();

  constructor() {
    this.init();
  }

  private init() {
    this.audio.src = this.playlist[this.currentAudio].url;
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

  setTrack(index?: number) {
    if (index === undefined) {
      this.audio.src = ''
      return
    }

    this.currentAudio = index
    this.audio.src = this.playlist[index].url;
  }

  togglePlay() {
    this.isPlaying ? this.pause() : this.play()
  }

  play() {
    if (!this.playlist.length) return
    this.audio.play()
    this.isPlaying = true
  }

  pause() {
    if (!this.playlist.length) return
    this.audio.pause()
    this.isPlaying = false
  }

  nextAudio() {
    this.clearAudioParams();
    this.currentAudio++;
    this.audio.src = this.playlist[this.currentAudio % this.playlist.length].url;
    this.audio.play();
    this.isPlaying = true;
  }

  prevAudio() {
    this.clearAudioParams();
    this.currentAudio =
      (this.currentAudio - 1 + this.playlist.length) % this.playlist.length;
    this.audio.src = this.playlist[this.currentAudio].url;
    this.audio.play();
    this.isPlaying = true;
  }

  private clearAudioParams() {
    this.currentTime = 0;
    this.isDragging = false;
  }

  removeTrack(index: number) {
    this.playlist.splice(index, 1);
    this.pause()
    this.audio.src = ''
    this.audio.currentTime = 0
    this.duration = 0
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

  addTrack(file: File) {
    const url = URL.createObjectURL(file);
    this.playlist.push({ name: file.name, url, id: Symbol() });
    this.tracksSubject.next(this.playlist);
  }

  showLoadedTracks(): Track[] {
    return this.playlist.map(track => ({ ...track }));
  }
}

