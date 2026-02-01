import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [],
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() centered: boolean = true;
  @Input() animated: boolean = true;
}