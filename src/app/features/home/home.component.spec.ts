import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { PortfolioService } from '../../core/services/portfolio.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let observe: jasmine.Spy;
  let unobserve: jasmine.Spy;
  let disconnect: jasmine.Spy;
  let intersectionCallback: IntersectionObserverCallback;

  beforeEach(async () => {
    observe = jasmine.createSpy('observe');
    unobserve = jasmine.createSpy('unobserve');
    disconnect = jasmine.createSpy('disconnect');
    spyOnProperty(document, 'hidden', 'get').and.returnValue(false);
    spyOn(window, 'matchMedia').and.callFake(query => ({ matches: false, media: query } as MediaQueryList));
    spyOn(window, 'IntersectionObserver').and.callFake(function(callback) {
      intersectionCallback = callback;
      return { observe, unobserve, disconnect } as unknown as IntersectionObserver;
    });
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        { provide: PortfolioService, useValue: {
          getPageContent: () => of({ typewriterWords: ['Software Engineer', 'Angular Developer'] }),
          getHomeStats: () => of([{ id: 1, number: 3, label: 'Years Experience', suffix: '+', order: 1, isVisible: true }])
        } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('renders stats without waiting for animation frames', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.stat-number').textContent).toBe('3');
  });

  it('uses static text and no scroll observer on mobile or reduced motion', fakeAsync(() => {
    (window.matchMedia as jasmine.Spy).and.returnValue({ matches: true });
    fixture.detectChanges();
    expect(component.typedText).toBe('Software Engineer');
    expect(observe).not.toHaveBeenCalled();
    tick(60000);
    expect(component.typedText).toBe('Software Engineer');
  }));

  it('stops typing and disconnects the observer when destroyed', fakeAsync(() => {
    fixture.detectChanges();
    tick(2200);
    expect(component.typedText).not.toBe('Software Engineer');
    fixture.destroy();
    const text = component.typedText;
    tick(60000);
    expect(component.typedText).toBe(text);
    expect(disconnect).toHaveBeenCalled();
  }));

  it('does not measure every card on mouse movement', () => {
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.tilt-card');
    const measure = spyOn(card, 'getBoundingClientRect');
    card.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
    expect(measure).not.toHaveBeenCalled();
  });

  it('stops typing when the tab becomes hidden', fakeAsync(() => {
    fixture.detectChanges();
    (Object.getOwnPropertyDescriptor(document, 'hidden')!.get as jasmine.Spy).and.returnValue(true);
    tick(60000);
    expect(component.typedText).toBe('Software Engineer');
  }));

  it('does not hide sections that are already visible during startup', () => {
    spyOn(HTMLElement.prototype, 'getBoundingClientRect').and.returnValue({ top: 0 } as DOMRect);
    fixture.detectChanges();
    expect(observe).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('.reveal-pending')).toBeNull();
  });

  it('prepares only below-the-fold sections for a scroll reveal', () => {
    spyOn(HTMLElement.prototype, 'getBoundingClientRect').and.returnValue({ top: window.innerHeight + 1 } as DOMRect);
    fixture.detectChanges();
    expect(observe).toHaveBeenCalledTimes(3);
    expect(fixture.nativeElement.querySelectorAll('.reveal-pending').length).toBe(3);
  });

  it('reveals each section only once', () => {
    fixture.detectChanges();
    const target = fixture.nativeElement.querySelector('.stats-section');
    intersectionCallback([{ target, isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(target.classList.contains('animate-in')).toBeTrue();
    expect(unobserve).toHaveBeenCalledWith(target);
  });

  it('finishes the desktop typing sequence instead of looping forever', fakeAsync(() => {
    fixture.detectChanges();
    tick(60000);
    expect(component.typedText).toBe('Software Engineer');
    const detectChanges = spyOn(fixture.componentRef.changeDetectorRef, 'detectChanges');
    tick(60000);
    expect(detectChanges).not.toHaveBeenCalled();
  }));
});
