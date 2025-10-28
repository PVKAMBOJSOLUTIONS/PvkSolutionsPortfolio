import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsShowcaseComponent } from '../skill-card/skill-card.component';


@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [CommonModule, SkillsShowcaseComponent],
  template: `
    <div class="page-container">
      <div class="page-hero">
        <h1 class="page-title">Technical Skills</h1>
        <p class="page-subtitle">Technologies and tools I excel at</p>
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
      text-align: center;
      padding: var(--spacing-5xl) var(--spacing-lg) var(--spacing-4xl);
      background: linear-gradient(135deg, var(--text-primary) 0%, #1a202c 50%, var(--primary-dark) 100%);
      color: var(--background-primary);
      position: relative;
      overflow: hidden;
    }
    .page-hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 20%, rgba(134, 176, 189, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(226, 161, 111, 0.1) 0%, transparent 50%);
      opacity: 0.8;
    }
    .page-hero::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg,
        transparent 0%,
        var(--primary-color) 20%,
        var(--highlight-color) 50%,
        var(--primary-color) 80%,
        transparent 100%
      );
    }
    .page-title {
      font-size: 3.8em;
      margin-bottom: var(--spacing-lg);
      font-weight: 800;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      position: relative;
      z-index: 2;
      background: linear-gradient(135deg, var(--background-primary) 0%, var(--accent-light) 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em;
    }
    .page-subtitle {
      font-size: 1.4em;
      opacity: 0.9;
      font-weight: 300;
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.7;
      position: relative;
      z-index: 2;
      color: var(--accent-light);
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    @media (max-width: 768px) {
      .page-hero {
        padding: var(--spacing-4xl) var(--spacing-lg) var(--spacing-2xl);
      }
      .page-title {
        font-size: 2.8em;
      }
      .page-subtitle {
        font-size: 1.2em;
      }
    }
    @media (max-width: 480px) {
      .page-hero {
        padding: var(--spacing-3xl) var(--spacing-md) var(--spacing-xl);
      }
      .page-title {
        font-size: 2.2em;
      }
      .page-subtitle {
        font-size: 1.1em;
      }
    }
  `]
})
export class SkillsPageComponent {}