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
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    .page-hero {
      text-align: center;
      padding: 80px 20px 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .page-title {
      font-size: 3em;
      margin-bottom: 15px;
      font-weight: 800;
    }
    .page-subtitle {
      font-size: 1.3em;
      opacity: 0.9;
    }
    @media (max-width: 768px) {
      .page-hero {
        padding: 60px 20px 40px;
      }
      .page-title {
        font-size: 2.2em;
      }
      .page-subtitle {
        font-size: 1.1em;
      }
    }
    @media (max-width: 480px) {
      .page-hero {
        padding: 50px 15px 30px;
      }
      .page-title {
        font-size: 1.8em;
      }
      .page-subtitle {
        font-size: 1em;
      }
    }
  `]
})
export class SkillsPageComponent {}