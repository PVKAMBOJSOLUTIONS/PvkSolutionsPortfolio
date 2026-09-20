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
    { name: '.NET Web API', description: 'REST services and integrations.' },
    { name: 'Angular', description: 'TypeScript components and RxJS.' },
    { name: 'Azure', description: 'App Services, Functions, cloud deployment.' },
    { name: 'SQL Server', description: 'Procedures, validation, migrations.' },
    { name: 'C#', description: 'Clean Architecture and NUnit.' },
    { name: 'CI/CD', description: 'Pipelines, containers, automation.' }
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
