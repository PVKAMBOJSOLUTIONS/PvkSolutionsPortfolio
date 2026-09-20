import { Component, OnInit, Input, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SkeletonComponent } from '../../../shared/components/skeleton.component';

import { Router } from '@angular/router';
import { HobbyCardComponent } from '../hobby-card/hobby-card.component';
import { Hobby } from '../../../core/models';
import { PortfolioService } from '../../../core/services/portfolio.service';

@Component({
  selector: 'app-hobbies',
  standalone: true,
  imports: [HobbyCardComponent, SkeletonComponent],
  templateUrl: './hobbies.component.html'
})
export class HobbiesComponent implements OnInit {
  @Input() limit: number = 0;
  @Input() showViewAll: boolean = false;
  
  private readonly destroyRef = inject(DestroyRef);
  hobbies: Hobby[] = [];
  loading = true;
  loadError = false;
  selectedId: number | null = null;

  constructor(
    private portfolioService: PortfolioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHobbies();
  }

  loadHobbies(): void {
    this.loading = true;
    this.loadError = false;
    this.portfolioService.getHobbies().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: hobbies => { this.hobbies = hobbies; this.loading = false; },
      error: () => { this.loadError = true; this.loading = false; }
    });
  }

  get activeHobby(): Hobby | undefined {
    return this.displayedHobbies.find(hobby => hobby.id === this.selectedId) ?? this.displayedHobbies[0];
  }

  get activeIndex(): number {
    return this.displayedHobbies.findIndex(hobby => hobby.id === this.activeHobby?.id);
  }

  nextInterest(): void {
    const hobbies = this.displayedHobbies;
    if (hobbies.length) this.selectedId = hobbies[(this.activeIndex + 1) % hobbies.length].id;
  }

  get displayedHobbies(): Hobby[] {
    return this.limit > 0 ? this.hobbies.slice(0, this.limit) : this.hobbies;
  }

  viewAllHobbies(): void {
    this.router.navigate(['/hobbies']);
  }
}
