import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project } from '../../../core/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  
  /** 🔹 Inputs passed from parent (HomeComponent) */
  @Input() limit: number = 3;
  @Input() showViewAll: boolean = true;

  /** 🔹 Full list of projects */
  projects: Project[] = [
    {
      id: 1,
      title: 'CricScorer',
      description: 'A real-time cricket scoring and management platform.',
      icon: '🏏',
      tags: ['Angular', 'React Native', 'Web API'],
      demoUrl: 'https://cricscorer-demo.com',
      githubUrl: 'https://github.com/yourname/cricscorer',
      status: 'published',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2025-10-10')
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'Personal portfolio built with Angular and TailwindCSS.',
      icon: '💼',
      tags: ['Angular', 'TailwindCSS'],
      demoUrl: 'https://myportfolio.com',
      githubUrl: 'https://github.com/yourname/portfolio',
      status: 'published',
      createdAt: new Date('2023-05-10'),
      updatedAt: new Date('2025-09-20')
    },
    {
      id: 3,
      title: 'Blog System',
      description: 'Markdown-based blogging platform with authentication.',
      icon: '📝',
      tags: ['Node.js', 'Express', 'MongoDB'],
      githubUrl: 'https://github.com/yourname/blog-system',
      status: 'draft',
      createdAt: new Date('2024-06-01'),
      updatedAt: new Date('2024-12-12')
    }
  ];

  displayedProjects: Project[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadProjects();
  }

  /** Simulated API loading */
  private loadProjects(): void {
    this.loading = true;
    setTimeout(() => {
      const published = this.projects.filter(p => p.status === 'published');
      this.displayedProjects = published.slice(0, this.limit);
      this.loading = false;
    }, 1000);
  }

  /** Called when "View All" button is clicked */
  viewAllProjects(): void {
    this.displayedProjects = this.projects.filter(p => p.status === 'published');
    this.showViewAll = false;
  }
}
