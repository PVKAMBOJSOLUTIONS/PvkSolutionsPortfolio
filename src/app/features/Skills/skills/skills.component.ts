import { Component } from '@angular/core';

import { SkillsShowcaseComponent } from '../skill-card/skill-card.component';


@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [SkillsShowcaseComponent],
  template: `
    <div class="page-container">
      <div class="page-hero">
        <h1 class="page-title">Technical Skills</h1>
        <p class="page-subtitle">Technologies and tools I excel at</p>
        <div class="title-underline"></div>
      </div>
      <app-skills-card></app-skills-card>
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
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color) 0%, var(--highlight-color) 100%);
      border-radius: var(--radius-full);
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
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color) 0%, var(--highlight-color) 100%);
      border-radius: var(--radius-full);
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
    @media (max-width: 768px) {
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
export class SkillsPageComponent {}