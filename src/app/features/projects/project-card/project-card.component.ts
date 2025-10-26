// project-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

// Define your project interface
// interface Project {
//   id: string | number;
//   title: string;
//   description: string;
//   image?: string;
//   technologies?: string[];
//   // Add other properties as needed
// }

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule,SectionHeaderComponent],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project; 
  /** 🔹 Full list of projects (could come from API in real app) */
  projects: Project[] = [
    {
      id: 1,
      title: 'CricScorer',
      description: 'A web and mobile app to manage and calculate live cricket scores.',
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
      description: 'A personal portfolio showcasing my projects and professional work.',
      icon: '💼',
      tags: ['Angular', 'TailwindCSS', 'Netlify'],
      demoUrl: 'https://myportfolio.com',
      githubUrl: 'https://github.com/yourname/portfolio',
      status: 'published',
      createdAt: new Date('2023-05-10'),
      updatedAt: new Date('2025-09-20')
    },
    {
      id: 3,
      title: 'Blog System',
      description: 'A markdown-based blog platform with authentication and comments.',
      icon: '📝',
      tags: ['Node.js', 'Express', 'MongoDB'],
      githubUrl: 'https://github.com/yourname/blog-system',
      status: 'draft',
      createdAt: new Date('2024-06-01'),
      updatedAt: new Date('2024-12-12')
    },
    {
      id: 4,
      title: 'E-Commerce Admin',
      description: 'An admin dashboard for managing products, orders, and analytics.',
      icon: '🛒',
      tags: ['Angular', 'Firebase', 'Chart.js'],
      demoUrl: 'https://ecommerce-admin-demo.com',
      githubUrl: 'https://github.com/yourname/ecommerce-admin',
      status: 'published',
      createdAt: new Date('2024-08-01'),
      updatedAt: new Date('2025-02-10')
    }
  ];

  /** 🔹 Displayed (filtered/limited) list of projects */
  displayedProjects: Project[] = [];

  /** 🔹 Show loading spinner while fetching data */
  loading = true;

  /** 🔹 Control the "View All" feature */
  showViewAll = true;

  /** 🔹 Number of projects to show initially */
  limit = 3;

  /** ✅ Lifecycle hook — runs when component initializes */
  ngOnInit(): void {
    this.loadProjects();
  }

  /** 🔹 Simulate API fetch or async data loading */
  private loadProjects(): void {
    this.loading = true;

    // Simulated delay to mimic API loading
    setTimeout(() => {
      // Only include published projects
      const published = this.projects.filter(p => p.status === 'published');

      // Show only limited number for featured section
      this.displayedProjects = published.slice(0, this.limit);

      this.loading = false;
    }, 1000);
  }

  /** 🔹 Called when "View All Projects" button is clicked */
  viewAllProjects(): void {
    this.displayedProjects = this.projects.filter(p => p.status === 'published');
    this.showViewAll = false; // Hide the button after showing all
  }
}