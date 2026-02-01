import { Component, Input } from '@angular/core';

import { Hobby } from '../../../core/models';

@Component({
  selector: 'app-hobby-card',
  standalone: true,
  imports: [],
  templateUrl: './hobby-card.component.html',
  styleUrls: ['./hobby-card.component.scss']
})
export class HobbyCardComponent {
  @Input() hobby!: Hobby;
}
