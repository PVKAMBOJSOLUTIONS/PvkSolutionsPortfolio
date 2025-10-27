import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsShowcaseComponent } from '../../Skills/skill-card/skill-card.component';
import { HobbiesComponent } from '../../hobbies/hobbies/hobbies.component';
import { AboutComponent } from '../../about/about.component';
import { ContactComponent } from '../../contact/contact.component';
import { ProjectComponent } from '../../projects/project/project.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProjectComponent,
    SkillsShowcaseComponent,
    HobbiesComponent,
    AboutComponent,
    ContactComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}