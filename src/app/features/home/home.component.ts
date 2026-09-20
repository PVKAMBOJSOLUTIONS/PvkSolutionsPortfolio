import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';
import { HomeStat } from '../../core/models';
import { SkeletonComponent } from '../../shared/components/skeleton.component';
import { ProjectComponent } from '../projects/project/project.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SkeletonComponent, ProjectComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly portfolioService = inject(PortfolioService);
  stats: HomeStat[] = [];
  loading = true;
  skills = [
    { name: '.NET Web API', description: 'Backend services, REST endpoints, and application integrations.' },
    { name: 'Angular', description: 'Component-based interfaces with TypeScript and RxJS.' },
    { name: '.NET MAUI', description: 'Cross-platform applications with native device integrations.' },
    { name: 'SQL Server', description: 'Stored procedures, data validation, and migrations.' },
    { name: 'C#', description: 'Application logic, Clean Architecture, and unit testing with NUnit.' },
    { name: 'CI/CD', description: 'Deployment pipelines, containers, and infrastructure automation.' }
  ];

  ngOnInit() {
    // Load page content
    // Load home stats
    this.portfolioService.getHomeStats().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: stats => {
        this.stats = stats.filter(stat => stat.isVisible).sort((a, b) => a.order - b.order);
        this.loading = false;
      },
      error: () => {
        // Fallback to default stats
        this.stats = [];
        this.loading = false;
      }
    });
  }
}
