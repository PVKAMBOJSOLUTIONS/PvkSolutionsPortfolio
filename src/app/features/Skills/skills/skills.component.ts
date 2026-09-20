import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SkillsShowcaseComponent } from '../skill-card/skill-card.component';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { Certification } from '../../../core/models';
import { SkeletonComponent } from '../../../shared/components/skeleton.component';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [SkillsShowcaseComponent, SkeletonComponent],
  template: `
    <div class="page-container">
      <div class="page-hero"><p class="eyebrow">Practice / Technical background</p><h1 class="page-title">Skills &amp; tools.</h1><p class="page-subtitle">The technologies I use and how they fit into my work.</p></div>
      <app-skills-card></app-skills-card>
      <!-- Certifications -->
      <section class="cert-section" aria-labelledby="cert-title">
        <h2 id="cert-title">Certifications.</h2>
        @if (loading) {<app-skeleton label="Loading certifications"></app-skeleton>}
        @if (certifications.length) {
          <div class="cert-grid">
            @for (cert of certifications; track cert.id) {
              <div class="cert-card"><div><h3 class="cert-name">{{ cert.title }}</h3><p class="cert-issuer">{{ cert.issuer }}</p></div>@if (cert.year) {<span>{{ cert.year }}</span>}</div>
            }
          </div>
        }
      </section>
    </div>
  `,
  styles: [`/* Certifications */`]
})
export class SkillsPageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  certifications: Certification[] = [];
  loading = true;
  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getCertifications().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: certs => {
        this.certifications = certs.filter(cert => cert.isVisible).sort((a, b) => a.order - b.order);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
