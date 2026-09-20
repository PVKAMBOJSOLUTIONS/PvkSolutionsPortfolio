import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mediaChange: (event: MediaQueryListEvent) => void;
  let removeMediaListener: jasmine.Spy;

  beforeEach(async () => {
    removeMediaListener = jasmine.createSpy('removeEventListener');
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true,
      addEventListener: (_type: string, listener: typeof mediaChange) => { mediaChange = listener; },
      removeEventListener: removeMediaListener
    } as unknown as MediaQueryList);
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([{ path: 'contact', children: [] }])]
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('keeps a closed menu inert and exposes its expanded state', () => {
    const menu = fixture.nativeElement.querySelector('.mobile-nav');
    const button = fixture.nativeElement.querySelector('.mobile-menu-btn');
    expect(menu.hasAttribute('inert')).toBeTrue();
    expect(button.getAttribute('aria-expanded')).toBe('false');
    button.click();
    fixture.detectChanges();
    expect(menu.hasAttribute('inert')).toBeFalse();
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  it('keeps the final state correct after rapid toggles', () => {
    const button = fixture.nativeElement.querySelector('.mobile-menu-btn');
    for (let i = 0; i < 10; i++) button.click();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen).toBeFalse();
    expect(fixture.nativeElement.querySelector('.mobile-nav').classList.contains('active')).toBeFalse();
  });

  it('closes on Escape and restores focus to the menu button', () => {
    const button = fixture.nativeElement.querySelector('.mobile-menu-btn');
    const focus = spyOn(button, 'focus');
    component.toggleMobileMenu();
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(component.isMobileMenuOpen).toBeFalse();
    expect(focus).toHaveBeenCalled();
  });

  it('closes when the menu button is clicked again', () => {
    component.toggleMobileMenu();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mobile-menu-btn').click();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen).toBeFalse();
  });

  it('closes after router navigation, including navigation outside the menu', async () => {
    component.toggleMobileMenu();
    await TestBed.inject(Router).navigateByUrl('/contact');
    fixture.detectChanges();
    expect(component.isMobileMenuOpen).toBeFalse();
    expect(component.isActiveRoute('contact')).toBeTrue();
  });

  it('closes when switching to the desktop breakpoint', () => {
    component.toggleMobileMenu();
    mediaChange({ matches: false } as MediaQueryListEvent);
    fixture.detectChanges();
    expect(component.isMobileMenuOpen).toBeFalse();
  });

  it('removes the breakpoint listener on destruction', () => {
    fixture.destroy();
    expect(removeMediaListener).toHaveBeenCalledWith('change', mediaChange);
  });
});
