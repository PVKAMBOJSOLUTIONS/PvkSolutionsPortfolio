import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/project.models';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;

  // Open demo link in new tab
  onViewDemo(): void {
    if (this.project.demoUrl) {
      window.open(this.project.demoUrl, '_blank');
    }
  }

  // Open GitHub repo in new tab
  onViewGithub(): void {
    if (this.project.githubUrl) {
      window.open(this.project.githubUrl, '_blank');
    }
  }

  // Check if project has any links
  get hasLinks(): boolean {
    return !!(this.project.demoUrl || this.project.githubUrl);
  }
}