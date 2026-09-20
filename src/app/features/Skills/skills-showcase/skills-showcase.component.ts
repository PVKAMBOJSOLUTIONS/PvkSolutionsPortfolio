import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { SkillShowcase } from '../../../core/models';
import { SkeletonComponent } from '../../../shared/components/skeleton.component';

@Component({
  selector: 'app-skills-showcase',
  standalone: true,
  imports: [SkeletonComponent],
  templateUrl: './skills-showcase.component.html'
})
export class SkillsShowcaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('skillCard') skillCards!: QueryList<ElementRef>;
  
  visibleCards: Set<number> = new Set();
  skills: SkillShowcase[] = [];
  loading = true;
  private observer?: IntersectionObserver;
  
  constructor(
    private portfolioService: PortfolioService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  // Format large numbers (e.g., 1000 -> 1K)
  formatNumber(num?: number): string {
    if (!num) return '0';
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num.toString();
  }
  
  getColor(index: number, skill?: SkillShowcase): string {
    // Use color from skill if available, otherwise use index-based color
    if (skill?.color) {
      return skill.color;
    }
    const colors = ['blue', 'purple', 'orange', 'green', 'pink', 'cyan'];
    return colors[index % colors.length];
  }
  
  getGradient(color: string): string {
    const colors: { [key: string]: string } = {
      blue: 'var(--primary-color)',
      purple: '#9A7CF5',
      orange: '#FF9E7A',
      green: '#6FCF97',
      pink: 'var(--highlight-color)',
      cyan: '#6EC6D8'
    };
    return colors[color] || colors['blue'];
  }
  
  ngOnInit(): void {
    // Load skill showcases from API
    this.portfolioService.getSkillShowcases().subscribe({
      next: (showcases) => {
        this.skills = showcases
          .filter(s => s.isVisible)
          .sort((a, b) => a.order - b.order);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading skill showcases:', error);
        this.loading = false;
        // Keep default skills as fallback
      }
    });
  }
  
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.skillCards.length) {
      // Re-run whenever the card list renders/changes (data loads async)
      this.skillCards.changes.subscribe(() => this.setupScrollAnimations());
      this.setupScrollAnimations();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
  
  setupScrollAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = this.skillCards.toArray()
              .findIndex(c => c.nativeElement === entry.target);
            if (cardIndex !== -1) {
              this.visibleCards.add(cardIndex);
              this.observer?.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    this.skillCards.forEach((card) => {
      this.observer!.observe(card.nativeElement);
    });
  }
  
}
