import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { HobbyCardComponent } from '../hobby-card/hobby-card.component';
import { Hobby } from '../../../core/models';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-hobbies',
  standalone: true,
  imports: [HobbyCardComponent, SectionHeaderComponent],
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss']
})
export class HobbiesComponent implements OnInit {
  @Input() limit: number = 0;
  @Input() showViewAll: boolean = false;
  
  hobbies: Hobby[] = [];

  constructor(
    private portfolioService: PortfolioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.portfolioService.getHobbies().subscribe(hobbies => {
      this.hobbies = hobbies;
    });
  }

  get displayedHobbies(): Hobby[] {
    return this.limit > 0 ? this.hobbies.slice(0, this.limit) : this.hobbies;
  }

  viewAllHobbies(): void {
    this.router.navigate(['/hobbies']);
  }
}
