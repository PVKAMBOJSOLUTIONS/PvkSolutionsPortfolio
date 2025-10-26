import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  constructor(private router: Router) {}

  // Navigate to route
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMobileMenuOpen = false;
  }

  // Scroll to section (only on home page)
  scrollToSection(sectionId: string): void {
    // If not on home page, navigate to home first
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollToElement(sectionId), 100);
      });
    } else {
      this.scrollToElement(sectionId);
    }
    this.isMobileMenuOpen = false;
  }

  private scrollToElement(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}