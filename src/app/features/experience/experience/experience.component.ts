import { Component } from '@angular/core';

import { WaveTimelineComponent } from '../wave-timeline/wave-timeline.component';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [WaveTimelineComponent],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent {}