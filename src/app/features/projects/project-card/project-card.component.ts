import { Component, Input } from '@angular/core';

import { Project } from '../../../core/models';

/**
 * ProjectCardComponent - Displays a single project card
 * This is a PRESENTATION component that receives a project via @Input()
 * It does NOT manage lists, loading states, or data fetching
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;
}