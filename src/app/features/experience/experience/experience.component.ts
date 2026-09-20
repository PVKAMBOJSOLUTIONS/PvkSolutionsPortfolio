import { Component } from '@angular/core';

import { CareerTimelineComponent } from '../career-timeline/career-timeline.component';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [CareerTimelineComponent],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent {}