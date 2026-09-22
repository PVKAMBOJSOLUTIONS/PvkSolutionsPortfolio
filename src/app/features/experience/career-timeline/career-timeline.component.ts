import { Component, OnInit } from '@angular/core';
import { Experience } from '../../../core/models';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { SkeletonComponent } from '../../../shared/components/skeleton.component';

@Component({
  selector: 'app-career-timeline',
  standalone: true,
  imports: [SkeletonComponent],
  templateUrl: './career-timeline.component.html'
})
export class CareerTimelineComponent implements OnInit {
  experiences: Experience[] = [];
  loading = true;
  loadError = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences(): void {
    this.loading = true;
    this.loadError = false;
    this.portfolioService.getExperiences().subscribe({
      next: (experiences) => {
        this.experiences = experiences;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading experiences:', error);
        this.loading = false;
        this.loadError = true;
      }
    });
  }

  isCurrent(experience: Experience): boolean {
    return !experience.endDate || experience.endDate.toLowerCase() === 'present';
  }

  getDuration(experience: Experience): string {
    const start = new Date(experience.startDate);
    const end = this.isCurrent(experience) ? new Date() : new Date(experience.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';
    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (months < 0) months = 0;
    const years = Math.floor(months / 12);
    const rest = months % 12;
    if (years && rest) return `${years} yr ${rest} mos`;
    if (years) return `${years} yr`;
    return `${rest} mos`;
  }
}
