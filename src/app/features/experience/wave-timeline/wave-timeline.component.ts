import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../core/models';
import { PortfolioService } from '../../../core/services/portfolio.service';

@Component({
  selector: 'app-wave-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-timeline.component.html',
  styleUrls: ['./wave-timeline.component.scss']
})
export class WaveTimelineComponent implements OnInit {
  experiences: Experience[] = [];
  loading = true;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences(): void {
    this.portfolioService.getExperiences().subscribe({
      next: (experiences) => {
        this.experiences = experiences;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading experiences:', error);
        this.loading = false;
      }
    });
  }

  getDateRange(experience: Experience): string {
    return `${experience.startDate} - ${experience.endDate}`;
  }
}