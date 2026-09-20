import { Component, Input, OnChanges } from '@angular/core';

import { Hobby } from '../../../core/models';

@Component({
  selector: 'app-hobby-card',
  standalone: true,
  templateUrl: './hobby-card.component.html'
})
export class HobbyCardComponent implements OnChanges {
  @Input() hobby!: Hobby;
  selectedActivity = 0;

  ngOnChanges(): void {
    this.selectedActivity = 0;
  }

  get activeActivity() {
    return this.hobby.activities?.[this.selectedActivity] ?? this.hobby.activities?.[0];
  }
}
