import { Component, HostListener, OnInit, OnDestroy, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Experience } from '../../../core/models';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { SkeletonComponent } from '../../../shared/components/skeleton.component';

@Component({
  selector: 'app-wave-timeline',
  standalone: true,
  imports: [SkeletonComponent],
  templateUrl: './wave-timeline.component.html'
})
export class WaveTimelineComponent implements OnInit, OnDestroy {
  @ViewChild('timelineWrapper') timelineWrapper!: ElementRef;
  
  experiences: Experience[] = [];
  loading = true;
  scrollProgress: number = 0;
  visibleItems: Set<number> = new Set();
  activeNodes: Set<number> = new Set();
  private scrollTicking = false;
  private visibilityObserver?: IntersectionObserver;

  constructor(
    private portfolioService: PortfolioService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadExperiences();
  }

  ngOnDestroy(): void {
    this.visibilityObserver?.disconnect();
  }

  loadExperiences(): void {
    this.loading = true;
    this.portfolioService.getExperiences().subscribe({
      next: (experiences) => {
        this.experiences = experiences;
        this.loading = false;
        if (isPlatformBrowser(this.platformId) && this.timelineWrapper) {
          // Wait for the @for block to render the items, then observe them
          setTimeout(() => {
            this.setupVisibilityObserver();
            this.updateScrollProgress();
            this.updateActiveNodes();
          }, 0);
        }
      },
      error: (error) => {
        console.error('Error loading experiences:', error);
        this.loading = false;
      }
    });
  }

  getPeriod(experience: Experience): string {
    if (experience.endDate && experience.endDate.toLowerCase() !== 'present') {
      return `${experience.startDate} - ${experience.endDate}`;
    }
    return `${experience.startDate} - Present`;
  }

  getColor(index: number): string {
    const colors = ['blue', 'purple', 'orange', 'green', 'pink'];
    return colors[index % colors.length];
  }

  getGradient(color: string): string {
    const colors: { [key: string]: string } = {
      blue: 'var(--primary-color)',
      purple: '#9A7CF5',
      orange: '#FF9E7A',
      green: '#6FCF97',
      pink: 'var(--highlight-color)'
    };
    return colors[color] || colors['blue'];
  }

  getNodeBackground(color: string, isActive: boolean): string {
    if (!isActive) return 'var(--neu-dark)';
    return this.getGradient(color);
  }

  getPeriodBg(color: string): string {
    const backgrounds: { [key: string]: string } = {
      blue: 'rgba(124, 111, 240, 0.12)',
      purple: 'rgba(154, 124, 245, 0.12)',
      orange: 'rgba(255, 158, 122, 0.15)',
      green: 'rgba(111, 207, 151, 0.15)',
      pink: 'rgba(255, 143, 160, 0.15)'
    };
    return backgrounds[color] || backgrounds['blue'];
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId) || !this.timelineWrapper || this.scrollTicking) return;
    // Throttle to one update per animation frame for smooth scrolling
    this.scrollTicking = true;
    requestAnimationFrame(() => {
      this.updateScrollProgress();
      this.updateActiveNodes();
      this.scrollTicking = false;
    });
  }

  private updateScrollProgress() {
    if (!this.timelineWrapper) return;

    const element = this.timelineWrapper.nativeElement;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;

    const scrollTop = -rect.top;
    const maxScroll = Math.max(1, elementHeight - windowHeight + 200);
    
    this.scrollProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));
  }

  private setupVisibilityObserver() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.visibilityObserver?.disconnect();
    this.visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset['index']);
            if (!isNaN(index)) {
              this.visibleItems.add(index);
              this.visibilityObserver?.unobserve(entry.target);
            }
          }
        });
      },
      // Trigger when the item's top passes 75% of the viewport
      { rootMargin: '0px 0px -25% 0px', threshold: 0 }
    );

    document.querySelectorAll('.timeline-item').forEach((item) => {
      this.visibilityObserver!.observe(item);
    });
  }

  private updateActiveNodes() {
    const currentNode = Math.floor(this.scrollProgress * this.experiences.length);
    this.activeNodes.clear();
    for (let i = 0; i <= currentNode; i++) {
      this.activeNodes.add(i);
    }
  }
}
