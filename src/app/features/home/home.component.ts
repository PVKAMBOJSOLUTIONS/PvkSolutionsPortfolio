import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren, QueryList, PLATFORM_ID, Inject, NgZone, ChangeDetectorRef, DestroyRef, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';
import { PageContent, HomeStat } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private typingTimer?: ReturnType<typeof setTimeout>;
  private scrollObserver?: IntersectionObserver;
  private readonly staticMotionQuery = '(max-width: 768px), (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)';
  typedText: string = 'Software Engineer';
  fullText: string = 'Software Engineer';
  typingSpeed: number = 100;
  currentWordIndex: number = 0;
  
  words: string[] = [
    'Software Engineer',
    '.NET Developer',
    'Angular Developer',
    '.NET MAUI Developer'
  ];

  pageContent: PageContent | null = null;
  particles = Array.from({ length: 6 }, (_, index) => index);
  skills = [
    { name: '.NET Web API', icon: '⚙️', description: 'Engineered 20+ production API endpoints improving system reliability and scalability' },
    { name: 'Angular', icon: '🅰️', description: 'Delivering responsive UI components that enhance user engagement and front-end performance' },
    { name: '.NET MAUI', icon: '📱', description: 'Building cross-platform mobile apps with custom handlers and native OS integrations' },
    { name: 'SQL Server', icon: '🗄️', description: 'Optimizing stored procedures and migrating 50K+ records with 98%+ accuracy' },
    { name: 'C#', icon: '💻', description: 'Writing clean, efficient code following Clean Architecture and FluentValidation principles' },
    { name: 'CI/CD', icon: '🚀', description: 'Automating deployments with pipelines and Firebase App Distribution, cutting release time by 60%' }
  ];

  stats: HomeStat[] = [];

  @ViewChildren('animateSection') sections!: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private portfolioService: PortfolioService,
    private zone: NgZone,
    private changeDetector: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Load page content
    this.portfolioService.getPageContent('home').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
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
    this.portfolioService.getHomeStats().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (stats) => {
        this.stats = stats.filter(s => s.isVisible).sort((a, b) => a.order - b.order);
      },
      error: (error) => {
        console.error('Error loading home stats:', error);
        // Fallback to default stats
        this.stats = [
          { id: 1, number: 3, label: 'Years Experience', suffix: '+', icon: '⭐', order: 1, isVisible: true },
          { id: 2, number: 20, label: 'API Endpoints Built', suffix: '+', icon: '⚙️', order: 2, isVisible: true },
          { id: 3, number: 90, label: 'Test Coverage', suffix: '%+', icon: '🧪', order: 3, isVisible: true },
          { id: 4, number: 50, label: 'Records Migrated', suffix: 'K+', icon: '🗃️', order: 4, isVisible: true }
        ];
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && !window.matchMedia(this.staticMotionQuery).matches) {
      this.zone.runOutsideAngular(() => this.setupScrollAnimations());
    }
  }

  ngOnDestroy() {
    clearTimeout(this.typingTimer);
    this.scrollObserver?.disconnect();
  }

  startTypingAnimation() {
    clearTimeout(this.typingTimer);
    this.typedText = this.words[0] || this.fullText;
    const motionPreference = window.matchMedia(this.staticMotionQuery);
    if (motionPreference.matches || !this.words.length) return;

    let wordIndex = 0;
    let charIndex = this.typedText.length;
    let isDeleting = true;

    const type = () => {
      if (document.hidden || motionPreference.matches) {
        this.typedText = this.words[0];
        this.changeDetector.detectChanges();
        return;
      }
      const currentWord = this.words[wordIndex];
      charIndex += isDeleting ? -1 : 1;
      this.typedText = currentWord.substring(0, charIndex);
      let delay = isDeleting ? 80 : 120;

      if (isDeleting && charIndex === 0) {
        wordIndex++;
        if (wordIndex === this.words.length) {
          this.typedText = this.words[0];
          this.changeDetector.detectChanges();
          return;
        }
        isDeleting = false;
        delay = 300;
      } else if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        delay = 2000;
      }

      this.changeDetector.detectChanges();
      this.typingTimer = setTimeout(type, delay);
    };

    this.zone.runOutsideAngular(() => {
      this.typingTimer = setTimeout(type, 2000);
    });
  }

  setupScrollAnimations() {
    this.scrollObserver?.disconnect();
    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            this.scrollObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.sections.forEach((section) => {
      if (section.nativeElement.getBoundingClientRect().top >= window.innerHeight) {
        section.nativeElement.classList.add('reveal-pending');
        this.scrollObserver?.observe(section.nativeElement);
      }
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
    if (!isPlatformBrowser(this.platformId)) return;
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';
    link.download = 'Pratham_Kamboj_Resume.pdf';
    link.click();
  }
}