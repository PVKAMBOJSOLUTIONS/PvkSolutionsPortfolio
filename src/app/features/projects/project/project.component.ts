import { Component, Input, OnInit } from '@angular/core';

import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project } from '../../../core/models';
import { PortfolioService } from '../../../core/services/portfolio.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  
  /** 🔹 Inputs passed from parent (HomeComponent) */
  @Input() limit: number = 0;
  @Input() showViewAll: boolean = false;

  /** 🔹 Full list of projects */
  allProjects: Project[] = [];
  
  /** 🔹 Displayed list of projects */
  displayedProjects: Project[] = [];
  
  loading = true;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  /** Load projects from service */
  private loadProjects(): void {
    this.loading = true;
    this.portfolioService.getProjects().subscribe({
      next: (projects) => {
        this.allProjects = projects;
        this.displayedProjects = this.limit > 0 
          ? projects.slice(0, this.limit) 
          : projects;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.loading = false;
      }
    });
  }

  /** Called when "View All" button is clicked */
  viewAllProjects(): void {
    this.displayedProjects = this.allProjects;
    this.showViewAll = false;
  }
}
