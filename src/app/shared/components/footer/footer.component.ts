import { Component } from '@angular/core';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  // Social links (can be moved to service later)
  socialLinks = [
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: '💻' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: '💼' },
    { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: '🐦' },
    { name: 'Email', url: 'mailto:your.email@example.com', icon: '✉️' }
  ];

  // Quick links
  quickLinks = [
    { label: 'About', sectionId: 'about' },
    { label: 'Projects', sectionId: 'projects' },
    { label: 'Skills', sectionId: 'skills' },
    { label: 'Contact', sectionId: 'contact' }
  ];

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}