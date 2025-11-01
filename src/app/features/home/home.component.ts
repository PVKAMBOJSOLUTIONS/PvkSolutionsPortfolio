import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';
import { PageContent, HomeStat } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  typedText: string = '';
  fullText: string = 'Full Stack Developer';
  typingSpeed: number = 100;
  currentWordIndex: number = 0;
  
  words: string[] = [
    'Full Stack Developer',
    'Problem Solver',
    'Tech Enthusiast',
    'Creative Thinker'
  ];

  pageContent: PageContent | null = null;
  particles = Array(15).fill(0);
  skills = [
    { name: 'Angular', icon: '🅰️', level: 90 },
    { name: 'TypeScript', icon: '📘', level: 85 },
    { name: 'Node.js', icon: '🟢', level: 80 },
    { name: 'MongoDB', icon: '🍃', level: 75 },
    { name: 'React', icon: '⚛️', level: 70 }
  ];

  stats: HomeStat[] = [];

  @ViewChildren('animateSection') sections!: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private portfolioService: PortfolioService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Load page content
    this.portfolioService.getPageContent('home').subscribe({
      next: (content) => {
        this.pageContent = content;
        if (content.heroTitle) this.fullText = content.heroTitle;
        if (content.typewriterWords && content.typewriterWords.length > 0) {
          this.words = content.typewriterWords;
        }
        if (isPlatformBrowser(this.platformId)) {
          this.startTypingAnimation();
        }
      },
      error: (error) => {
        console.error('Error loading page content:', error);
        if (isPlatformBrowser(this.platformId)) {
          this.startTypingAnimation();
        }
      }
    });

    // Load home stats
    this.portfolioService.getHomeStats().subscribe({
      next: (stats) => {
        this.stats = stats.filter(s => s.isVisible).sort((a, b) => a.order - b.order);
      },
      error: (error) => {
        console.error('Error loading home stats:', error);
        // Fallback to default stats
        this.stats = [
          { id: 1, number: 50, label: 'Projects Completed', suffix: '+', icon: '✨', order: 1, isVisible: true },
          { id: 2, number: 5, label: 'Years Experience', suffix: '+', icon: '⭐', order: 2, isVisible: true },
          { id: 3, number: 100, label: 'Happy Clients', suffix: '+', icon: '🎉', order: 3, isVisible: true },
          { id: 4, number: 20, label: 'Technologies', suffix: '+', icon: '🚀', order: 4, isVisible: true }
        ];
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimations();
      this.animateStats();
    }
  }

  startTypingAnimation() {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentWord = this.words[wordIndex];
      
      if (isDeleting) {
        this.typedText = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        this.typedText = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % this.words.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    };

    type();
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    this.sections.forEach((section) => {
      observer.observe(section.nativeElement);
    });
  }

  animateStats() {
    const duration = 2000;
    const elements = document.querySelectorAll('.stat-number');
    
    elements.forEach((element, index) => {
      const target = this.stats[index].number;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          element.textContent = Math.ceil(current).toString();
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target.toString();
        }
      };

      setTimeout(() => updateCounter(), 500);
    });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        (card as HTMLElement).style.transform = 
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      }
    });
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach((card) => {
      (card as HTMLElement).style.transform = 
        'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  scrollToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  downloadCV() {
    // Implement CV download logic
    console.log('Downloading CV...');
  }
}