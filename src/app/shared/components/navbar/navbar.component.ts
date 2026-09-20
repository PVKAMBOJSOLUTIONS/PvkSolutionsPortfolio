import { Component, OnInit, DestroyRef, ElementRef, HostListener, NgZone, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);
  @ViewChild('menuButton') private menuButton?: ElementRef<HTMLButtonElement>;
  isMobileMenuOpen = false;
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Get current route
    this.currentRoute = this.router.url === '/' ? '' : this.router.url.substring(1);
    
    // Subscribe to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        this.currentRoute = event.urlAfterRedirects === '/' ? '' : event.urlAfterRedirects.substring(1);
        this.closeMobileMenu();
      });

    if (isPlatformBrowser(this.platformId)) {
      const mobileViewport = window.matchMedia('(max-width: 768px)');
      const onViewportChange = (event: MediaQueryListEvent) => {
        if (!event.matches && this.isMobileMenuOpen) {
          this.zone.run(() => this.closeMobileMenu());
        }
      };
      this.zone.runOutsideAngular(() => mobileViewport.addEventListener('change', onViewportChange));
      this.destroyRef.onDestroy(() => mobileViewport.removeEventListener('change', onViewportChange));
    }
  }

  // Check if route is active
  isActiveRoute(route: string): boolean {
    if (route === '' && this.currentRoute === '') {
      return true;
    }
    return this.currentRoute === route;
  }

  // Navigate to route
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeMobileMenu();
  }

  // Scroll to section (only on home page)
  scrollToSection(sectionId: string): void {
    // If not on home page, navigate to home first
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollToElement(sectionId), 100);
      });
    } else {
      this.scrollToElement(sectionId);
    }
    this.closeMobileMenu();
  }

  private scrollToElement(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(restoreFocus = false): void {
    this.isMobileMenuOpen = false;
    if (restoreFocus) this.menuButton?.nativeElement.focus({ preventScroll: true });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMobileMenuOpen) this.closeMobileMenu(true);
  }
}
