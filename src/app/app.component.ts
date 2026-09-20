import { Component, OnInit } from '@angular/core';
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
  curtainLabel = '';
  private currentPath = '';
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor(
    private router: Router,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.currentPath = this.router.url.split('#')[0];
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const targetPath = event.url.split('#')[0];
        if (targetPath !== this.currentPath) {
          this.timers.forEach(clearTimeout);
          this.timers = [];
          this.revealing = false;
          this.covering = true;
          this.curtainLabel = this.labelFor(targetPath);
        }
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        if (event instanceof NavigationEnd) {
          this.currentPath = event.urlAfterRedirects.split('#')[0];
          this.scrollService.scrollToTop();
        }
        if (this.covering) {
          this.timers.push(setTimeout(() => {
            this.covering = false;
            this.revealing = true;
            this.timers.push(setTimeout(() => {
              this.revealing = false;
              this.curtainLabel = '';
            }, 480));
          }, 520));
        }
      }
    });
  }

  private labelFor(path: string): string {
    const labels: Record<string, string> = {
      '': 'Index',
      '/projects': 'Projects',
      '/skills': 'Skills',
      '/hobbies': 'Interests',
      '/experience': 'Experience',
      '/contact': 'Contact'
    };
    return labels[path] ?? 'Portfolio';
  }
}