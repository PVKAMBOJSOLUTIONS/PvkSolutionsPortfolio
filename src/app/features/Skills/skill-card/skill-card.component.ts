import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { SkillShowcase } from '../../../core/models';

@Component({
  selector: 'app-skills-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss']
})
export class SkillsShowcaseComponent implements OnInit, AfterViewInit {
  @ViewChildren('skillCard') skillCards!: QueryList<ElementRef>;
  
  visibleCards: Set<number> = new Set();
  skills: SkillShowcase[] = [];
  loading = true;
  
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
    const gradients: { [key: string]: string } = {
      blue: `linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 50%, var(--highlight-color) 100%)`,
      purple: `linear-gradient(135deg, var(--primary-color) 0%, var(--highlight-color) 100%)`,
      orange: `linear-gradient(135deg, var(--highlight-color) 0%, var(--highlight-dark) 100%)`,
      green: `linear-gradient(135deg, var(--primary-color) 0%, #10b981 100%)`,
      pink: `linear-gradient(135deg, var(--highlight-color) 0%, #ec4899 100%)`,
      cyan: `linear-gradient(135deg, var(--primary-color) 0%, #06b6d4 100%)`
    };
    return gradients[color] || gradients['blue'];
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
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.setupScrollAnimations(), 100);
    }
  }
  
  setupScrollAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const cardIndex = Array.from(document.querySelectorAll('.magnetic-card')).indexOf(entry.target);
            if (cardIndex !== -1) {
              this.visibleCards.add(cardIndex);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    this.skillCards.forEach((card) => {
      observer.observe(card.nativeElement);
    });
  }
  
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const cards = document.querySelectorAll('.magnetic-card');
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      const cardBack = cardElement.querySelector('.card-back') as HTMLElement;
      
      // Check if card-back is visible (opacity > 0.5) or hovered
      const isBackVisible = cardBack && (
        window.getComputedStyle(cardBack).opacity !== '0' ||
        cardBack.matches(':hover') ||
        cardElement.matches(':hover .card-back')
      );
      
      // Disable magnetic effect when scrolling on back face
      if (isBackVisible) {
        // Only apply magnetic effect to the card container, not when interacting with scrollable content
        const isOverScrollable = cardBack.contains(event.target as Node);
        if (isOverScrollable) {
          return; // Don't apply magnetic effect when hovering over scrollable content
        }
      }
      
      const rect = cardElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      const translateX = ((x - centerX) / centerX) * 15;
      const translateY = ((y - centerY) / centerY) * 15;
      
      cardElement.style.transform = 
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0)`;
    });
  }
  
  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const cards = document.querySelectorAll('.magnetic-card');
    cards.forEach((card) => {
      (card as HTMLElement).style.transform = 
        'perspective(1000px) rotateX(0) rotateY(0) translate3d(0, 0, 0)';
    });
  }
  
}
