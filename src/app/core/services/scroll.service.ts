import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  scrollToTop(): void {
    // Check if we're running in the browser
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  scrollToSection(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }

  getScrollPosition(): number {
    if (isPlatformBrowser(this.platformId)) {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
    return 0;
  }
}