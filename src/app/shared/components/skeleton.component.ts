import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div class="loading-state" role="status" aria-live="polite" aria-busy="true">
      <span class="visually-hidden">{{ label }}</span>
      <div class="skeleton-line skeleton-heading" aria-hidden="true"></div>
      <div class="skeleton-line" aria-hidden="true"></div>
      <div class="skeleton-line skeleton-short" aria-hidden="true"></div>
    </div>
  `
})
export class SkeletonComponent {
  @Input() label = 'Loading content';
}
