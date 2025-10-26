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
      padding-top: 80px;
      background: white;
    }
    .page-hero {
      text-align: center;
      padding: 60px 20px;
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
  `]
})
export class SkillsPageComponent {}