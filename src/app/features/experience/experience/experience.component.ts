import { Component } from '@angular/core';

import { WaveTimelineComponent } from '../wave-timeline/wave-timeline.component';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [WaveTimelineComponent],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {}