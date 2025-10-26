import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsPageComponent } from '../../Skills/skills/skills.component';
import { HobbiesComponent } from '../../hobbies/hobbies/hobbies.component';
import { AboutComponent } from '../../about/about.component';
import { ContactComponent } from '../../contact/contact.component';
import { ProjectCardComponent } from '../../projects/project-card/project-card.component';
import { ProjectComponent } from '../../projects/project/project.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProjectComponent,
    ProjectCardComponent,
    SkillsPageComponent,
    HobbiesComponent,
    AboutComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}