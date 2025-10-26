import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveTimelineComponent } from './wave-timeline.component';

describe('WaveTimelineComponent', () => {
  let component: WaveTimelineComponent;
  let fixture: ComponentFixture<WaveTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaveTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaveTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
