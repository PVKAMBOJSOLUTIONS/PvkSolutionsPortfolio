import { Component, Input, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project } from '../../../core/models';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { SkeletonComponent } from '../../../shared/components/skeleton.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent, SkeletonComponent],
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  /** 🔹 Inputs passed from parent (HomeComponent) */
  @Input() limit: number = 0;
  @Input() showViewAll: boolean = false;

  /** 🔹 Full list of projects */
  allProjects: Project[] = [];

  /** 🔹 Displayed list of projects */
  get displayedProjects(): Project[] {
    const query = this.query.trim().toLowerCase();
    const projects = this.allProjects.filter(project => {
      const text = [project.title, project.description, ...(project.tags || [])].join(' ').toLowerCase();
      const category = project.tags?.includes('.NET MAUI') ? 'Mobile'
        : project.tags?.includes('Ansible') ? 'Infrastructure' : 'Web';
      return (this.category === 'All' || category === this.category) && text.includes(query);
    });
    return this.limit > 0 ? projects.slice(0, this.limit) : projects;
  }

  readonly categories = ['All', 'Web', 'Mobile', 'Infrastructure'];
  category = 'All';
  query = '';
  loading = true;
  loadError = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  /** Load projects from service */
  loadProjects(): void {
    this.loading = true;
    this.loadError = false;
    this.portfolioService.getProjects().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: projects => {
        this.allProjects = projects;
        this.loading = false;
      },
      error: () => {
        this.loadError = true;
        this.loading = false;
      }
    });
  }

  /** Called when "View All" button is clicked */
  viewAllProjects(): void {
    this.limit = 0;
    this.showViewAll = false;
  }
}
