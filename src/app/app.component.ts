import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, PlatformLocation } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ScrollService } from './core/services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent, 
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio-app';
  covering = false;
  revealing = false;
  intro = true;
  introElapsed = '0s';
  curtainLabel = '';
  private currentPath = '';
  private timers: ReturnType<typeof setTimeout>[] = [];
  private freezeEl: HTMLElement | null = null;
  private revealScheduled = false;

  constructor(
    private router: Router,
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: object,
    private platformLocation: PlatformLocation
  ) {}

  ngOnInit(): void {
    this.currentPath = this.initialPath();
    this.curtainLabel = this.labelFor(this.currentPath);
    if (!isPlatformBrowser(this.platformId)) return;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const targetPath = event.url.split('#')[0];
        if (targetPath !== this.currentPath && this.router.navigated) {
          this.timers.forEach(clearTimeout);
          this.timers = [];
          this.intro = false;
          this.revealing = false;
          this.revealScheduled = false;
          this.covering = true;
          this.curtainLabel = this.labelFor(targetPath);
          this.freezeCurrentPage();
        }
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        if (event instanceof NavigationEnd) {
          this.currentPath = event.urlAfterRedirects.split('#')[0];
          this.scrollService.scrollToTop();
        }
        if (this.covering) {
          this.scheduleReveal();
        }
      }
    });
    const elapsed = this.introElapsedMs();
    this.introElapsed = `${(elapsed / 1000).toFixed(2)}s`;
    this.timers.push(setTimeout(() => {
      this.intro = false;
      if (!this.covering && !this.revealing) {
        this.curtainLabel = '';
      }
    }, Math.max(0, 1450 - elapsed)));
  }

  private introElapsedMs(): number {
    const anim = document.getAnimations().find(
      a => a instanceof CSSAnimation && a.animationName === 'curtain-lift'
    );
    return typeof anim?.currentTime === 'number' ? anim.currentTime : performance.now();
  }

  private scheduleReveal(): void {
    if (this.revealScheduled) return;
    this.revealScheduled = true;
    this.timers.push(setTimeout(() => {
      this.covering = false;
      this.revealing = true;
      this.releaseFreeze();
      this.timers.push(setTimeout(() => {
        this.revealing = false;
        this.curtainLabel = '';
        this.revealScheduled = false;
      }, 860));
    }, 850));
  }

  private freezeCurrentPage(): void {
    this.releaseFreeze();
    if (!isPlatformBrowser(this.platformId)) return;
    const main = document.getElementById('main-content');
    if (!main) return;
    const rect = main.getBoundingClientRect();
    const clone = main.cloneNode(true) as HTMLElement;
    clone.removeAttribute('id');
    const freeze = document.createElement('div');
    freeze.className = 'page-freeze';
    freeze.style.top = `${rect.top}px`;
    freeze.style.height = `${rect.height}px`;
    freeze.appendChild(clone);
    document.body.appendChild(freeze);
    this.freezeEl = freeze;
  }

  private releaseFreeze(): void {
    this.freezeEl?.remove();
    this.freezeEl = null;
  }

  private initialPath(): string {
    if (isPlatformBrowser(this.platformId)) {
      return this.router.url.split('#')[0];
    }
    return (this.platformLocation.pathname || '/').replace(/\/+$/, '') || '/';
  }

  private labelFor(path: string): string {
    const labels: Record<string, string> = {
      '/': 'Portfolio',
      '/projects': 'Projects',
      '/skills': 'Skills',
      '/hobbies': 'Interests',
      '/experience': 'Experience',
      '/contact': 'Contact'
    };
    return labels[path] ?? 'Portfolio';
  }
}