import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon.component';


@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, IconComponent],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    window.history.back();
  }
}