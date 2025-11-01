import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Skill {
  icon: string;
  title: string;
  projectCount?: number;
  yearsExperience?: string;
  description: string;
  techStack: string[];
  color?: string;
}

@Component({
  selector: 'app-skills-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss']
})
export class SkillsShowcaseComponent implements OnInit, AfterViewInit {
  @ViewChildren('skillCard') skillCards!: QueryList<ElementRef>;
  
  visibleCards: Set<number> = new Set();
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  // Format large numbers (e.g., 1000 -> 1K)
  formatNumber(num?: number): string {
    if (!num) return '0';
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num.toString();
  }
  
  getColor(index: number): string {
    const colors = ['blue', 'purple', 'orange', 'green', 'pink', 'cyan'];
    return colors[index % colors.length];
  }
  
  getGradient(color: string): string {
    const gradients: { [key: string]: string } = {
      blue: `linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 50%, var(--highlight-color) 100%)`,
      purple: `linear-gradient(135deg, var(--primary-color) 0%, var(--highlight-color) 100%)`,
      orange: `linear-gradient(135deg, var(--highlight-color) 0%, var(--highlight-dark) 100%)`,
      green: `linear-gradient(135deg, var(--primary-color) 0%, #10b981 100%)`,
      pink: `linear-gradient(135deg, var(--highlight-color) 0%, #ec4899 100%)`,
      cyan: `linear-gradient(135deg, var(--primary-color) 0%, #06b6d4 100%)`
    };
    return gradients[color] || gradients['blue'];
  }
  
  ngOnInit(): void {}
  
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.setupScrollAnimations(), 100);
    }
  }
  
  setupScrollAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const cardIndex = Array.from(document.querySelectorAll('.magnetic-card')).indexOf(entry.target);
            if (cardIndex !== -1) {
              this.visibleCards.add(cardIndex);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    this.skillCards.forEach((card) => {
      observer.observe(card.nativeElement);
    });
  }
  
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const cards = document.querySelectorAll('.magnetic-card');
    cards.forEach((card) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      const translateX = ((x - centerX) / centerX) * 15;
      const translateY = ((y - centerY) / centerY) * 15;
      
      (card as HTMLElement).style.transform = 
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0)`;
    });
  }
  
  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const cards = document.querySelectorAll('.magnetic-card');
    cards.forEach((card) => {
      (card as HTMLElement).style.transform = 
        'perspective(1000px) rotateX(0) rotateY(0) translate3d(0, 0, 0)';
    });
  }
  
  // You can customize these skills with your own data
  skills: Skill[] = [
    {
      icon: '🎨',
      title: 'Frontend Development',
      projectCount: 25,
      yearsExperience: '5+',
      description: 'Creating beautiful and responsive user interfaces with modern frameworks. Specialized in building scalable single-page applications with focus on user experience and performance optimization.',
      techStack: ['Angular', 'React', 'TypeScript', 'TailwindCSS', 'SASS']
    },
    {
      icon: '⚙️',
      title: 'Backend Development',
      projectCount: 20,
      yearsExperience: '4+',
      description: 'Building robust server-side applications and RESTful APIs. Expertise in designing scalable architectures and implementing secure authentication systems.',
      techStack: ['.NET Core', 'C#', 'ASP.NET', 'Entity Framework', 'SQL Server']
    },
    {
      icon: '💻',
      title: 'Full Stack Development',
      projectCount: 30,
      yearsExperience: '5+',
      description: 'End-to-end development of web applications from concept to deployment. Proven track record of delivering complete solutions on time and within budget.',
      techStack: ['Angular', '.NET Core', 'TypeScript', 'SQL Server', 'Azure']
    },
    {
      icon: '🗄️',
      title: 'Database Management',
      projectCount: 15,
      yearsExperience: '4+',
      description: 'Designing and optimizing database schemas for performance and scalability. Expert in query optimization and data modeling best practices.',
      techStack: ['SQL Server', 'PostgreSQL', 'Entity Framework', 'Azure SQL']
    },
    {
      icon: '☁️',
      title: 'Cloud & DevOps',
      projectCount: 12,
      yearsExperience: '3+',
      description: 'Deploying applications to cloud platforms and implementing CI/CD pipelines. Skilled in containerization and infrastructure as code.',
      techStack: ['Azure', 'Docker', 'Git', 'Azure DevOps', 'PowerShell']
    },
    {
      icon: '🔧',
      title: 'Problem Solving',
      projectCount: 40,
      yearsExperience: '6+',
      description: 'Solving complex technical challenges and optimizing application performance. Strong analytical skills and systematic approach to debugging.',
      techStack: ['Algorithms', 'Data Structures', 'Architecture', 'Debugging']
    }
  ];
}
