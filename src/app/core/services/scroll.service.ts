import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  
  constructor() { }

  /**
   * Smoothly scroll to the top of the page
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Smoothly scroll to a specific element
   * @param elementId - The ID of the element to scroll to
   * @param offset - Optional offset from the top (default: 80px for navbar)
   */
  scrollToElement(elementId: string, offset: number = 80): void {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Smoothly scroll to a specific position
   * @param position - The position to scroll to
   */
  scrollToPosition(position: number): void {
    window.scrollTo({
      top: position,
      left: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Get current scroll position
   */
  getCurrentScrollPosition(): number {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  /**
   * Check if user is at the top of the page
   */
  isAtTop(): boolean {
    return this.getCurrentScrollPosition() === 0;
  }
}
