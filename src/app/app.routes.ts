import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  // Home route
  { 
    path: '', 
    component: HomeComponent,
    title: 'Home - Portfolio'
  },
  
  // Other routes
  { 
    path: 'projects', 
    component: ProjectsComponent,
    title: 'Projects - Portfolio'
  },
  { 
    path: 'about', 
    component: AboutComponent,
    title: 'About - Portfolio'
  },
  { 
    path: 'contact', 
    component: ContactComponent,
    title: 'Contact - Portfolio'
  },
  
  // Admin routes
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)
  },
  
  // 404 - Must be last!
  { 
    path: '**', 
    component: NotFoundComponent,
    title: '404 - Page Not Found'
  }
]