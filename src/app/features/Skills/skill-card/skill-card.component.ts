import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { SkillShowcase } from '../../../core/models';

@Component({
  selector: 'app-skills-card',
  standalone: true,
  imports: [],
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
    
    const target = event.target as HTMLElement;
    const cards = document.querySelectorAll('.magnetic-card');
    
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      const cardBack = cardElement.querySelector('.card-back') as HTMLElement;
      
      // Check if mouse is over the card-back or its children
      const isOverCardBack = cardBack && (
        cardBack.contains(target) ||
        target === cardBack ||
        target.closest('.card-back') === cardBack
      );
      
      // Check if card-back is visible (hovered state or opacity > 0)
      const computedStyle = window.getComputedStyle(cardBack);
      const isBackVisible = cardElement.classList.contains('hovered') || 
                           (cardBack && parseFloat(computedStyle.opacity) > 0.5);
      
      // If hovering over scrollable back face, completely disable magnetic effect
      if (isOverCardBack && isBackVisible) {
        cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translate3d(0, 0, 0)';
        return;
      }
      
      // Don't apply magnetic effect if not hovering over the card
      if (!cardElement.contains(target)) {
        return;
      }
      
      // Check if mouse is actually inside the card bounds
      const rect = cardElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        return;
      }
      
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
  
  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    const target = event.target as HTMLElement;
    const card = target.closest('.magnetic-card') as HTMLElement;
    if (card) {
      card.classList.add('hovered');
    }
  }
  
  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const cards = document.querySelectorAll('.magnetic-card');
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      cardElement.classList.remove('hovered');
      cardElement.style.transform = 
        'perspective(1000px) rotateX(0) rotateY(0) translate3d(0, 0, 0)';
    });
  }
  
  onCardBackWheel(event: WheelEvent, index: number): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Allow normal scrolling behavior
    const cardBack = event.currentTarget as HTMLElement;
    const card = cardBack.closest('.magnetic-card') as HTMLElement;
    
    if (card) {
      // Completely disable transform when scrolling
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translate3d(0, 0, 0)';
      // Allow scroll event to proceed normally
      event.stopPropagation();
    }
  }
  
  onCardBackMouseMove(event: MouseEvent, index: number): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Disable magnetic effect when mouse is over card-back
    const cardBack = event.currentTarget as HTMLElement;
    const card = cardBack.closest('.magnetic-card') as HTMLElement;
    
    if (card) {
      // Reset transform to allow scrolling
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translate3d(0, 0, 0)';
    }
  }
}
