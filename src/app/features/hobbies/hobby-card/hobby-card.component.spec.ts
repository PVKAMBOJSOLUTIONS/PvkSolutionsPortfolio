import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HobbyCardComponent } from './hobby-card.component';

describe('HobbyCardComponent', () => {
  let fixture: ComponentFixture<HobbyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HobbyCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(HobbyCardComponent);
    fixture.componentRef.setInput('hobby', {
      id: 1, title: 'Sports', description: 'Badminton and basketball.', icon: 'trophy',
      activities: [
        { name: 'Badminton', description: 'Quick rallies.' },
        { name: 'Basketball', description: 'Team play.' }
      ]
    });
    fixture.detectChanges();
  });

  it('renders an illustration and native expandable notes', () => {
    expect(fixture.nativeElement.querySelector('.interest-visual svg')).not.toBeNull();
    const details = fixture.nativeElement.querySelector('details');
    expect(details.open).toBeFalse();
    details.querySelector('summary').click();
    expect(details.open).toBeTrue();
  });

  it('updates the note and drawing when an activity is chosen', () => {
    fixture.nativeElement.querySelector('summary').click();
    fixture.nativeElement.querySelectorAll('.activity-choices button')[1].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.activity-description').textContent).toContain('Team play.');
    expect(fixture.nativeElement.querySelector('.activity-choices [aria-pressed="true"]').textContent).toBe('Basketball');
    expect(fixture.nativeElement.querySelectorAll('circle').length).toBe(3);
  });

  it('supports interests without activity metadata or a known illustration', () => {
    fixture.componentRef.setInput('hobby', { id: 5, title: 'Reading', description: 'Books.', icon: 'book' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('details')).toBeNull();
    expect(fixture.nativeElement.querySelector('.study-letter').textContent).toBe('R');
  });
});
