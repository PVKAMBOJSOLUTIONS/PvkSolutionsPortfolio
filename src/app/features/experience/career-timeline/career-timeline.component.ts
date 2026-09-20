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

  get workEntries(): Experience[] {
    return this.experiences.filter(e => !this.isEducation(e));
  }

  get eduEntries(): Experience[] {
    return this.experiences.filter(e => this.isEducation(e));
  }

  private isEducation(experience: Experience): boolean {
    return /universit|college|b\.?tech|degree|school/i.test(experience.company + ' ' + experience.title);
  }

  private monthIndex(value: string): number {
    const d = new Date(value);
    return d.getFullYear() * 12 + d.getMonth();
  }

  private get startMonth(): number {
    return Math.min(...this.experiences.map(e => this.monthIndex(e.startDate)));
  }

  private get endMonth(): number {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth();
  }

  private segEnd(experience: Experience): number {
    return this.isCurrent(experience) ? this.endMonth : this.monthIndex(experience.endDate);
  }

  segTop(experience: Experience): number {
    const span = Math.max(1, this.endMonth - this.startMonth);
    return ((this.endMonth - this.segEnd(experience)) / span) * 100;
  }

  segHeight(experience: Experience): number {
    const span = Math.max(1, this.endMonth - this.startMonth);
    return Math.max(3, ((this.segEnd(experience) - this.monthIndex(experience.startDate)) / span) * 100);
  }

  get scaleStartYear(): number {
    return this.experiences.length ? Math.floor(this.startMonth / 12) : new Date().getFullYear();
  }

  get yearTicks(): { label: string; top: number }[] {
    if (!this.experiences.length) return [];
    const span = Math.max(1, this.endMonth - this.startMonth);
    const now = new Date();
    const ticks: { label: string; top: number }[] = [];
    for (let y = this.scaleStartYear; y <= now.getFullYear(); y++) {
      ticks.push({ label: String(y), top: Math.min(100, ((this.endMonth - y * 12) / span) * 100) });
    }
    return ticks;
  }

  focusEntry(id: number): void {
    const el = document.getElementById('exp-entry-' + id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('is-focused');
    setTimeout(() => el.classList.remove('is-focused'), 1400);
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
