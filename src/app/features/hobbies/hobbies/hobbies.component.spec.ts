import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { Hobby } from '../../../core/models';
import { HobbiesComponent } from './hobbies.component';

const hobbies: Hobby[] = [
  { id: 1, title: 'Sports', description: 'Badminton and basketball.', icon: 'trophy' },
  { id: 2, title: 'Travel', description: 'Treks and long rides.', icon: 'compass' }
];

describe('HobbiesComponent', () => {
  let component: HobbiesComponent;
  let fixture: ComponentFixture<HobbiesComponent>;
  let service: jasmine.SpyObj<PortfolioService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj('PortfolioService', ['getHobbies']);
    service.getHobbies.and.returnValue(of(hobbies));
    await TestBed.configureTestingModule({
      imports: [HobbiesComponent],
      providers: [provideRouter([]), { provide: PortfolioService, useValue: service }]
    }).compileComponents();
    fixture = TestBed.createComponent(HobbiesComponent);
    component = fixture.componentInstance;
  });

  it('starts with the first interest and exposes the selection', () => {
    fixture.detectChanges();
    const selected = fixture.nativeElement.querySelector('.interest-choice[aria-pressed="true"]');
    expect(selected?.textContent).toContain('Sports');
    expect(fixture.nativeElement.querySelectorAll('app-hobby-card').length).toBe(1);
  });

  it('switches the detail panel when an interest is selected', () => {
    fixture.detectChanges();
    fixture.nativeElement.querySelectorAll('.interest-choice')[1].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-hobby-card').textContent).toContain('Treks and long rides.');
    expect(fixture.nativeElement.querySelector('.interest-choice[aria-pressed="true"]').textContent).toContain('Travel');
  });

  it('cycles through interests and wraps to the beginning', () => {
    fixture.detectChanges();
    const next = fixture.nativeElement.querySelector('.next-interest');
    next.click();
    fixture.detectChanges();
    next.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.interest-choice[aria-pressed="true"]').textContent).toContain('Sports');
  });

  it('respects the preview limit', () => {
    component.limit = 1;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.interest-choice').length).toBe(1);
    expect(fixture.nativeElement.querySelector('.next-interest')).toBeNull();
  });

  it('keeps loading and empty states free of unusable controls', () => {
    const pending = new Subject<Hobby[]>();
    service.getHobbies.and.returnValue(pending);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-skeleton')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.interest-choice')).toBeNull();
    pending.next([]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No interests are currently available.');
  });

  it('provides a retry when loading fails', () => {
    service.getHobbies.and.returnValue(throwError(() => new Error('Unavailable')));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
    service.getHobbies.and.returnValue(of(hobbies));
    fixture.nativeElement.querySelector('.retry-interests').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.interest-choice').length).toBe(2);
  });
});
