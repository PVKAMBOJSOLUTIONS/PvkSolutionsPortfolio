import { Component, HostListener, OnInit, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Experience } from '../../../core/models';
import { PortfolioService } from '../../../core/services/portfolio.service';

@Component({
  selector: 'app-wave-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-timeline.component.html',
  styleUrls: ['./wave-timeline.component.scss']
})
export class WaveTimelineComponent implements OnInit {
  @ViewChild('timelineWrapper') timelineWrapper!: ElementRef;
  
  experiences: Experience[] = [];
  loading = true;
  scrollProgress: number = 0;
  visibleItems: Set<number> = new Set();
  activeNodes: Set<number> = new Set();

  constructor(
    private portfolioService: PortfolioService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadExperiences();
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.checkVisibleItems(), 100);
    }
  }

  loadExperiences(): void {
    this.loading = true;
    this.portfolioService.getExperiences().subscribe({
      next: (experiences) => {
        this.experiences = experiences;
        this.loading = false;
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => this.checkVisibleItems(), 100);
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
    const gradients: { [key: string]: string } = {
      blue: `linear-gradient(135deg, var(--primary-color), var(--primary-dark))`,
      purple: `linear-gradient(135deg, var(--primary-color), var(--highlight-color))`,
      orange: `linear-gradient(135deg, var(--highlight-color), var(--highlight-dark))`,
      green: `linear-gradient(135deg, var(--primary-color), #10b981)`,
      pink: `linear-gradient(135deg, var(--highlight-color), #ec4899)`
    };
    return gradients[color] || gradients['blue'];
  }

  getNodeBackground(color: string, isActive: boolean): string {
    if (!isActive) return 'var(--border-light)';
    return this.getGradient(color);
  }

  getPeriodBg(color: string): string {
    const backgrounds: { [key: string]: string } = {
      blue: 'rgba(134, 176, 189, 0.15)',
      purple: 'rgba(134, 176, 189, 0.15)',
      orange: 'rgba(226, 161, 111, 0.15)',
      green: 'rgba(134, 176, 189, 0.15)',
      pink: 'rgba(226, 161, 111, 0.15)'
    };
    return backgrounds[color] || backgrounds['blue'];
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.updateScrollProgress();
    this.checkVisibleItems();
    this.updateActiveNodes();
  }

  private updateScrollProgress() {
    if (!this.timelineWrapper) return;

    const element = this.timelineWrapper.nativeElement;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;

    const scrollTop = -rect.top;
    const maxScroll = elementHeight - windowHeight + 200;
    
    this.scrollProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));
  }

  private checkVisibleItems() {
    if (!isPlatformBrowser(this.platformId)) return;
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight * 0.75) {
        this.visibleItems.add(index);
      }
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
