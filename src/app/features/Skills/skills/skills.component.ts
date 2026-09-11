import { Component, OnInit } from '@angular/core';

import { SkillsShowcaseComponent } from '../skill-card/skill-card.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { Certification } from '../../../core/models';


@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [SkillsShowcaseComponent, IconComponent],
  template: `
    <div class="page-container">
      <div class="page-hero">
        <h1 class="page-title">Technical Skills</h1>
        <p class="page-subtitle">Technologies and tools I excel at</p>
        <div class="title-underline"></div>
      </div>
      <app-skills-card></app-skills-card>

      <!-- Certifications -->
      @if (certifications.length > 0) {
        <section class="cert-section">
          <div class="cert-header">
            <h2 class="cert-title">Certifications</h2>
            <div class="title-underline"></div>
          </div>
          <div class="cert-grid">
            @for (cert of certifications; track cert) {
              <div class="cert-card">
                <div class="cert-icon"><app-icon [name]="cert.icon"></app-icon></div>
                <div class="cert-body">
                  <h3 class="cert-name">{{ cert.title }}</h3>
                  <p class="cert-issuer">{{ cert.issuer }}</p>
                </div>
                @if (cert.year) {
                  <span class="cert-year">{{ cert.year }}</span>
                }
              </div>
            }
          </div>
        </section>
      }
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      padding-top: 0;
      background: var(--background-primary);
    }
    .page-hero {
      text-align: left;
      padding: var(--spacing-5xl) var(--spacing-lg) var(--spacing-4xl);
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
    }
    .page-title {
      font-size: 3.5em;
      margin-bottom: var(--spacing-md);
      font-weight: 900;
      position: relative;
      z-index: 2;
      padding-top: 20px;
      animation: fadeInDown 0.6s ease-out;
      color: var(--text-primary);
    }
    .page-title::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 6px;
      background: var(--primary-color);
      border-radius: var(--radius-full);
      box-shadow: var(--neu-raised-xs);
    }
    .page-subtitle {
      font-size: 1.3em;
      opacity: 0.95;
      font-weight: 400;
      max-width: 600px;
      margin: 0 auto var(--spacing-md) auto;
      line-height: 1.6;
      position: relative;
      z-index: 2;
      text-align: center;
      animation: fadeInUp 0.6s ease-out 0.2s both;
      color: var(--text-muted);
    }
    .title-underline {
      width: 80px;
      height: 6px;
      background: var(--highlight-color);
      border-radius: var(--radius-full);
      box-shadow: var(--neu-raised-xs);
      margin: 0 auto;
      animation: expandWidth 0.8s ease-out 0.4s both;
    }
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes expandWidth {
      from {
        width: 0;
      }
      to {
        width: 80px;
      }
    }
    /* Certifications */
    .cert-section {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 var(--spacing-xl) var(--spacing-5xl);
    }
    .cert-header {
      text-align: center;
      margin-bottom: var(--spacing-3xl);
    }
    .cert-title {
      font-size: 2.5em;
      font-weight: 900;
      color: var(--text-primary);
      margin-bottom: var(--spacing-md);
    }
    .cert-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
      gap: var(--spacing-xl);
    }
    .cert-card {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      background: var(--background-primary);
      border-radius: var(--radius-xl);
      padding: var(--spacing-lg);
      box-shadow: var(--neu-raised-sm);
      transition: all var(--transition-normal);
      animation: fadeInUp 0.6s ease-out;
    }
    .cert-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--neu-raised);
    }
    .cert-icon {
      flex-shrink: 0;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-lg);
      background: var(--accent-color);
      color: var(--primary-color);
      font-size: 1.6em;
      box-shadow: var(--neu-inset-xs);
    }
    .cert-body {
      flex: 1;
      min-width: 0;
    }
    .cert-name {
      font-size: 1.1em;
      font-weight: 800;
      color: var(--primary-color);
      margin: 0 0 4px;
    }
    .cert-issuer {
      font-size: 0.9em;
      color: var(--text-muted);
      margin: 0;
    }
    .cert-year {
      flex-shrink: 0;
      padding: var(--spacing-xs) var(--spacing-md);
      border-radius: var(--radius-full);
      font-size: 0.8em;
      font-weight: 700;
      color: var(--primary-color);
      box-shadow: var(--neu-inset-xs);
      white-space: nowrap;
    }
    @media (max-width: 768px) {
      .cert-section {
        padding: 0 var(--spacing-md) var(--spacing-4xl);
      }
      .cert-title {
        font-size: 2em;
      }
      .page-hero {
        padding: var(--spacing-4xl) var(--spacing-lg) var(--spacing-2xl);
      }
      .page-title {
        font-size: 2.8em;
        padding-top: 16px;
      }
      .page-title::before {
        width: 30px;
        height: 3px;
      }
      .page-subtitle {
        font-size: 1.2em;
      }
      .title-underline {
        width: 60px;
        height: 3px;
      }
    }
    @media (max-width: 480px) {
      .page-hero {
        padding: var(--spacing-3xl) var(--spacing-md) var(--spacing-xl);
      }
      .page-title {
        font-size: 2.2em;
        padding-top: 14px;
      }
      .page-title::before {
        width: 25px;
        height: 2px;
      }
      .page-subtitle {
        font-size: 1.1em;
      }
      .title-underline {
        width: 50px;
        height: 2px;
      }
    }
  `]
})
export class SkillsPageComponent implements OnInit {
  certifications: Certification[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getCertifications().subscribe({
      next: (certs) => {
        this.certifications = certs
          .filter(c => c.isVisible)
          .sort((a, b) => a.order - b.order);
      },
      error: (error) => console.error('Error loading certifications:', error)
    });
  }
}