import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hobby } from '../../../core/models';

@Component({
  selector: 'app-hobby-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hobby-card.component.html',
  styleUrls: ['./hobby-card.component.scss']
})
export class HobbyCardComponent {
  @Input() hobby!: Hobby;
}
