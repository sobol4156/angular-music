import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicUploaderComponent } from './music-uploader.component';

describe('MusicUploaderComponent', () => {
  let component: MusicUploaderComponent;
  let fixture: ComponentFixture<MusicUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicUploaderComponent]
    });
    fixture = TestBed.createComponent(MusicUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
