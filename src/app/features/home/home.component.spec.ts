import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { PortfolioService } from '../../core/services/portfolio.service';
import { HomeStat } from '../../core/models';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let service: jasmine.SpyObj<PortfolioService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj('PortfolioService', ['getHomeStats', 'getProjects']);
    service.getHomeStats.and.returnValue(of([
      { id: 1, number: 3, label: 'Years Experience', suffix: '+', order: 1, isVisible: true }
    ]));
    service.getProjects.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([]), { provide: PortfolioService, useValue: service }]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
  });

  it('renders a static professional introduction', fakeAsync(() => {
    fixture.detectChanges();
    const heading = fixture.nativeElement.querySelector('h1').textContent;
    tick(60000);
    expect(fixture.nativeElement.querySelector('h1').textContent).toBe(heading);
    expect(fixture.nativeElement.textContent).toContain('Software Engineer');
    expect(fixture.nativeElement.querySelector('.cursor')).toBeNull();
  }));

  it('uses real links for projects and the resume', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a[href="/projects"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('a[download][href="assets/resume.pdf"]')).not.toBeNull();
  });

  it('removes decorative effects and icon cards', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.blob, .particles, .animated-bg, .tilt-card, app-icon')).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.tech-tile').length).toBe(6);
  });

  it('shows a skeleton while facts load', () => {
    service.getHomeStats.and.returnValue(new Subject<HomeStat[]>());
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-skeleton [role="status"]')).not.toBeNull();
  });

  it('removes the portfolio label and shows a static portrait with caption', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('Independent portfolio');
    expect(fixture.nativeElement.querySelector('.portrait-controls')).toBeNull();
    expect(fixture.nativeElement.querySelector('.portrait img')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.portrait figcaption')).toBeNull();
  });

  it('renders supplied facts without animation', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.stat-number').textContent).toContain('3');
  });

  it('does not invent fallback metrics when data fails', () => {
    service.getHomeStats.and.returnValue(throwError(() => new Error('Unavailable')));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.stat-number')).toBeNull();
    expect(fixture.nativeElement.querySelector('app-skeleton')).toBeNull();
  });
});
