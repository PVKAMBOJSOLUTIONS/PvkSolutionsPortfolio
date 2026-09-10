import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}
  
  // Social links (can be moved to service later)
  socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/pratham-kamboj', icon: '�' },
    { name: 'Email', url: 'mailto:prathamkamboj002@gmail.com', icon: '✉️' }
  ];

  // Quick links — routes matching app.routes.ts
  quickLinks = [
    { label: 'Home', route: '' },
    { label: 'Projects', route: 'projects' },
    { label: 'Skills', route: 'skills' },
    { label: 'Hobbies', route: 'hobbies' },
    { label: 'Experience', route: 'experience' },
    { label: 'Contact', route: 'contact' }
  ];

  navigateTo(route: string): void {
    this.router.navigate([route === '' ? '/' : `/${route}`]);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}