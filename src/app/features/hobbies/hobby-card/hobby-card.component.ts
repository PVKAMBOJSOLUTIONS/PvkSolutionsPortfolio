import { Component, Input } from '@angular/core';

import { Hobby } from '../../../core/models';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-hobby-card',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './hobby-card.component.html',
  styleUrls: ['./hobby-card.component.scss']
})
export class HobbyCardComponent {
  @Input() hobby!: Hobby;
}
