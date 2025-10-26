import { Routes } from '@angular/router';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HomeComponent } from './features/home/home/home.component';
import { SkillsPageComponent } from './features/Skills/skills/skills.component';
import { HobbiesComponent } from './features/hobbies/hobbies/hobbies.component';
import { ExperienceComponent } from './features/experience/experience/experience.component';
import { ProjectCardComponent } from './features/projects/project-card/project-card.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Home - Full Stack Developer Portfolio'
  },
  { 
    path: 'projects', 
    component: ProjectCardComponent,
    title: 'Projects - My Work'
  },
  { 
    path: 'skills', 
    component: SkillsPageComponent,
    title: 'Skills - Technical Expertise'
  },
  { 
    path: 'hobbies', 
    component: HobbiesComponent,
    title: 'Hobbies - Beyond Code'
  },
  { 
    path: 'experience', 
    component: ExperienceComponent,
    title: 'Experience - Professional Journey'
  },
  { 
    path: '**', 
    component: NotFoundComponent,
    title: '404 - Page Not Found'
  }
];
