import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsShowcaseComponent } from './skill-card.component';

describe('SkillsShowcaseComponent', () => {
  let component: SkillsShowcaseComponent;
  let fixture: ComponentFixture<SkillsShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsShowcaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
