import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseCanvasComponent } from './canvas-pulse.component';

describe('CanvasPulseComponent', () => {
  let component: PulseCanvasComponent;
  let fixture: ComponentFixture<PulseCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PulseCanvasComponent]
    });
    fixture = TestBed.createComponent(PulseCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
