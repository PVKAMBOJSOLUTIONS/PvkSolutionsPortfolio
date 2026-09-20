import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PortfolioApiService } from './portfolio-api.service';
import { 
  Project, 
  Skill, 
  SkillCategory, 
  Hobby, 
  Profile, 
  ContactInfo,
  Experience,
  PageContent,
  PageSection,
  SkillShowcase,
  HomeStat,
  Certification
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // Flag to toggle between API and mock data
  private useApi = false;

  constructor(private portfolioApi: PortfolioApiService) {}

  // ============================================
  // PROJECTS
  // ============================================
  getProjects(): Observable<Project[]> {
    if (this.useApi) {
      return this.portfolioApi.getAllProjects();
    }
    return of(this.getMockProjects());
  }

  getProjectById(id: number): Observable<Project> {
    if (this.useApi) {
      return this.portfolioApi.getProjectById(id);
    }
    const projects = this.getMockProjects();
    const project = projects.find(p => p.id === id);
    return of(project!);
  }

  // ============================================
  // SKILLS
  // ============================================
  getSkills(): Observable<SkillCategory[]> {
    if (this.useApi) {
      return this.portfolioApi.getAllSkills();
    }
    return of(this.getMockSkills());
  }

  // ============================================
  // HOBBIES
  // ============================================
  getHobbies(): Observable<Hobby[]> {
    if (this.useApi) {
      return this.portfolioApi.getAllHobbies();
    }
    return of(this.getMockHobbies());
  }

  // ============================================
  // PROFILE
  // ============================================
  getProfile(): Observable<Profile> {
    if (this.useApi) {
      return this.portfolioApi.getProfile();
    }
    return of(this.getMockProfile());
  }

  // ============================================
  // CONTACT INFO
  // ============================================
  getContactInfo(): Observable<ContactInfo> {
    if (this.useApi) {
      return this.portfolioApi.getContactInfo();
    }
    return of(this.getMockContactInfo());
  }

  // ============================================
  // EXPERIENCE
  // ============================================
  getExperiences(): Observable<Experience[]> {
    if (this.useApi) {
      return this.portfolioApi.getAllExperiences();
    }
    return of(this.getMockExperiences());
  }

  // ============================================
  // PAGE CONTENT
  // ============================================
  getPageContent(pageName: string): Observable<PageContent> {
    if (this.useApi) {
      return this.portfolioApi.getPageContent(pageName);
    }
    return of(this.getMockPageContent(pageName));
  }

  getAllPageContent(): Observable<PageContent[]> {
    if (this.useApi) {
      return this.portfolioApi.getAllPageContent();
    }
    return of([]);
  }

  // ============================================
  // SKILL SHOWCASES
  // ============================================
  getSkillShowcases(): Observable<SkillShowcase[]> {
    if (this.useApi) {
      return this.portfolioApi.getAllSkillShowcases();
    }
    return of(this.getMockSkillShowcases());
  }

  getSkillShowcaseById(id: number): Observable<SkillShowcase> {
    if (this.useApi) {
      return this.portfolioApi.getSkillShowcaseById(id);
    }
    const showcases = this.getMockSkillShowcases();
    return of(showcases.find(s => s.id === id)!);
  }

  // ============================================
  // CERTIFICATIONS
  // ============================================
  getCertifications(): Observable<Certification[]> {
    if (this.useApi) {
      return this.portfolioApi.getAllCertifications();
    }
    return of(this.getMockCertifications());
  }

  // ============================================
  // HOME STATS
  // ============================================
  getHomeStats(): Observable<HomeStat[]> {
    if (this.useApi) {
      return this.portfolioApi.getAllHomeStats();
    }
    return of(this.getMockHomeStats());
  }

  getHomeStatById(id: number): Observable<HomeStat> {
    if (this.useApi) {
      return this.portfolioApi.getHomeStatById(id);
    }
    const stats = this.getMockHomeStats();
    return of(stats.find(s => s.id === id)!);
  }

  /**
   * Toggle between API and mock data
   * Call this method when your backend is ready
   */
  enableApiMode(): void {
    this.useApi = true;
  }

  disableApiMode(): void {
    this.useApi = false;
  }

  // ============================================
  // MOCK DATA (Remove when API is ready)
  // ============================================

  private getMockProjects(): Project[] {
    return [
      {
        id: 1,
        title: 'Member Management System',
        description: 'Member management system for senior citizens. 20+ .NET Web API endpoints, 30% faster data retrieval, 90%+ NUnit coverage.',
        icon: 'users',
        tags: ['.NET Web API', 'Angular', 'SQL Server', 'NUnit'],
        status: 'published',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-06-01')
      },
      {
        id: 2,
        title: 'Cross-Platform Mobile App',
        description: '.NET MAUI app with 10+ custom handlers and native OS integrations. CI/CD via Firebase App Distribution, 60% faster releases.',
        icon: 'mobile',
        tags: ['.NET MAUI', 'XAML', 'MVVM', 'CI/CD', 'Firebase'],
        status: 'published',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-06-01')
      },
      {
        id: 3,
        title: 'SelfForge: Self-Hosted Infrastructure-as-Code Platform',
        description: 'Self-hosted server platform as infrastructure-as-code. Ansible + k3s provisioning, Prometheus/Grafana/Loki monitoring, Vault and Cloudflare security.',
        icon: 'server',
        tags: ['Ansible', 'k3s', 'Docker', 'Prometheus', 'Grafana', 'Vault'],
        status: 'published',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-06-01')
      },
      {
        id: 4,
        title: 'Zoho → Monday.com Integration',
        description: 'Zoho–Monday.com middleware over webhooks and layered API calls. Automated recruitment workflows, 30–40% less HR effort.',
        icon: 'link',
        tags: ['.NET', 'Webhooks', 'REST APIs', 'FluentValidation'],
        status: 'published',
        createdAt: new Date('2023-07-01'),
        updatedAt: new Date('2023-12-01')
      },
      {
        id: 5,
        title: 'Data Migration System',
        description: 'ASP.NET MVC system for Gideons International. 50,000+ legacy records migrated at 98%+ accuracy, iTextSharp reports 60% faster.',
        icon: 'database',
        tags: ['ASP.NET MVC', 'SQL Server', 'FluentValidation', 'iTextSharp'],
        status: 'published',
        createdAt: new Date('2023-07-01'),
        updatedAt: new Date('2023-12-01')
      },
      {
        id: 6,
        title: 'APORIA: Real-Time Social Music Platform',
        description: 'Real-time social music platform, in development. Synchronized lyrics, SignalR live sessions, Python RAG/LLM services.',
        icon: 'music',
        tags: ['ASP.NET Core', 'SignalR', 'Next.js', 'PostgreSQL', 'Redis', 'Python'],
        status: 'draft',
        createdAt: new Date('2025-06-01'),
        updatedAt: new Date('2025-09-01')
      }
    ];
  }

  private getMockSkills(): SkillCategory[] {
    return [
      {
        category: 'languages',
        displayName: 'Languages',
        icon: 'code',
        skills: [
          { id: 1, name: 'C#', category: 'languages', proficiency: 95 },
          { id: 2, name: 'SQL', category: 'languages', proficiency: 90 },
          { id: 3, name: 'TypeScript', category: 'languages', proficiency: 88 },
          { id: 4, name: 'JavaScript', category: 'languages', proficiency: 85 },
          { id: 5, name: 'XAML', category: 'languages', proficiency: 80 },
          { id: 21, name: 'Python', category: 'languages', proficiency: 75 }
        ]
      },
      {
        category: 'frameworks',
        displayName: 'Frameworks & Patterns',
        icon: 'gear',
        skills: [
          { id: 6, name: 'ASP.NET MVC', category: 'frameworks', proficiency: 90 },
          { id: 7, name: '.NET Web API', category: 'frameworks', proficiency: 92 },
          { id: 8, name: 'Angular', category: 'frameworks', proficiency: 88 },
          { id: 9, name: '.NET MAUI (MVVM)', category: 'frameworks', proficiency: 82 },
          { id: 10, name: 'Clean Architecture', category: 'frameworks', proficiency: 85 },
          { id: 11, name: 'FluentValidation', category: 'frameworks', proficiency: 85 },
          { id: 12, name: 'NUnit', category: 'frameworks', proficiency: 88 },
          { id: 22, name: 'RESTful APIs', category: 'frameworks', proficiency: 90 }
        ]
      },
      {
        category: 'technologies',
        displayName: 'Technologies & Tools',
        icon: 'tools',
        skills: [
          { id: 13, name: '.NET / .NET Core', category: 'technologies', proficiency: 92 },
          { id: 14, name: 'Microsoft SQL Server', category: 'technologies', proficiency: 88 },
          { id: 15, name: 'SQLite', category: 'technologies', proficiency: 80 },
          { id: 16, name: 'Git / Version Control', category: 'technologies', proficiency: 90 },
          { id: 17, name: 'CI/CD Pipelines', category: 'technologies', proficiency: 82 },
          { id: 18, name: 'Firebase App Distribution', category: 'technologies', proficiency: 78 },
          { id: 19, name: 'iTextSharp', category: 'technologies', proficiency: 75 },
          { id: 20, name: 'Webhooks & REST APIs', category: 'technologies', proficiency: 88 },
          { id: 23, name: 'PostgreSQL', category: 'technologies', proficiency: 75 },
          { id: 24, name: 'Redis', category: 'technologies', proficiency: 72 },
          { id: 25, name: 'Docker', category: 'technologies', proficiency: 80 },
          { id: 26, name: 'Ansible', category: 'technologies', proficiency: 75 },
          { id: 27, name: 'k3s / Kubernetes', category: 'technologies', proficiency: 74 },
          { id: 28, name: 'Prometheus & Grafana', category: 'technologies', proficiency: 72 }
        ]
      }
    ];
  }

  private getMockHobbies(): Hobby[] {
    return [
      { 
        id: 1, 
        title: 'Sports', 
        description: 'Playing badminton and basketball, always up for a good match.',
        icon: 'trophy',
        activities: [
          { name: 'Badminton', description: 'Quick rallies, racket control, and movement around the court.' },
          { name: 'Basketball', description: 'A team sport built around passing, positioning, and shooting.' }
        ]
      },
      { 
        id: 2, 
        title: 'Travel & Adventure', 
        description: 'Going on treks and long rides to explore new places and unwind.', 
        icon: 'compass',
        activities: [
          { name: 'Treks', description: 'Exploring new places on foot, away from the usual routine.' },
          { name: 'Long rides', description: 'Taking the longer route to explore and unwind.' }
        ]
      },
      { 
        id: 3, 
        title: 'Gaming', 
        description: 'Playing Valorant and other competitive titles, along with immersive story-mode games.', 
        icon: 'gamepad',
        activities: [
          { name: 'Competitive', description: 'Valorant and other competitive titles.' },
          { name: 'Story mode', description: 'Immersive games built around characters, worlds, and a narrative.' }
        ]
      },
      { 
        id: 4, 
        title: 'Tech Exploration', 
        description: 'Keeping up with new hardware technologies and exploring all things tech.', 
        icon: 'monitor',
        activities: [
          { name: 'Hardware', description: 'Keeping up with new hardware technologies and how they work.' },
          { name: 'Exploration', description: 'Looking into tools and technologies beyond everyday development.' }
        ]
      }
    ];
  }

  private getMockProfile(): Profile {
    return {
      id: 1,
      name: 'Pratham Kamboj',
      title: 'Software Engineer',
      tagline: 'Building scalable web & mobile applications with .NET, Angular & .NET MAUI',
      bio: 'Software Engineer with 3+ years building production .NET Core / ASP.NET Web API backends and Angular front ends, plus a cross-platform .NET MAUI app. Shipped 20+ backend API endpoints, cut data retrieval time 30% by optimizing SQL Server stored procedures, and held 90%+ unit test coverage with NUnit inside CI/CD pipelines.',
      avatar: '/assets/profile.png',
      resumeUrl: '/assets/resume.pdf'
    };
  }

  private getMockContactInfo(): ContactInfo {
    return {
      email: 'prathamkamboj002@gmail.com',
      phone: '+91 90450 88352',
      location: 'Mohali, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/pratham-kamboj', icon: 'briefcase' },
        { platform: 'Instagram', url: 'https://instagram.com/pratham__kamboj', icon: 'camera' },
        { platform: 'Email', url: 'mailto:prathamkamboj002@gmail.com', icon: 'mail' }
      ]
    };
  }

  private getMockSkillShowcases(): SkillShowcase[] {
    return [
      {
        id: 1,
        icon: 'gear',
        title: 'Backend Development',
        projectCount: 20,
        yearsExperience: '2+',
        description: 'Engineered 20+ backend API endpoints using .NET Web API, improving system reliability and scalability. Experienced in building middleware integrations with webhooks and multi-level API calls.',
        techStack: ['.NET Web API', 'ASP.NET MVC', 'C#', 'Clean Architecture', 'FluentValidation'],
        order: 1,
        isVisible: true
      },
      {
        id: 2,
        icon: 'palette',
        title: 'Frontend Development',
        projectCount: 10,
        yearsExperience: '2+',
        description: 'Delivering responsive Angular UI components that enhance user engagement and front-end performance. Certified in Angular with hands-on production experience, plus Next.js/React work on APORIA.',
        techStack: ['Angular', 'TypeScript', 'JavaScript', 'Next.js', 'React', 'RxJS'],
        order: 2,
        isVisible: true
      },
      {
        id: 3,
        icon: 'mobile',
        title: 'Cross-Platform Mobile',
        projectCount: 5,
        yearsExperience: '1+',
        description: 'Built GideonNow, a .NET MAUI app with 10+ custom handlers and validation services. Integrated native OS features like camera, local storage, and notifications across iOS and Android.',
        techStack: ['.NET MAUI', 'XAML', 'MVVM', 'SQLite', 'Firebase App Distribution'],
        order: 3,
        isVisible: true
      },
      {
        id: 4,
        icon: 'database',
        title: 'Database & Data',
        projectCount: 8,
        yearsExperience: '2+',
        description: 'Developed and optimized stored procedures reducing data retrieval time by 30%. Migrated and validated 50,000+ records with 98%+ accuracy.',
        techStack: ['SQL Server', 'T-SQL', 'PostgreSQL', 'Redis', 'SQLite', 'Data Migration'],
        order: 4,
        isVisible: true
      },
      {
        id: 5,
        icon: 'flask',
        title: 'Testing & Quality',
        projectCount: 10,
        yearsExperience: '2+',
        description: 'Achieved 90%+ unit test coverage using NUnit, supporting robust CI/CD pipelines and lowering bug rates across production systems.',
        techStack: ['NUnit', 'Unit Testing', 'FluentValidation', 'CI/CD'],
        order: 5,
        isVisible: true
      },
      {
        id: 6,
        icon: 'rocket',
        title: 'DevOps & Delivery',
        projectCount: 6,
        yearsExperience: '1+',
        description: 'Automated staging and production deployments using CI/CD pipelines including Firebase App Distribution, reducing release time by 60%. Built SelfForge, a self-hosted IaC platform with Ansible, k3s, and Prometheus/Grafana monitoring.',
        techStack: ['CI/CD', 'Git', 'Docker', 'Ansible', 'k3s', 'Prometheus', 'Grafana', 'Firebase App Distribution'],
        order: 6,
        isVisible: true
      }
    ];
  }

  private getMockCertifications(): Certification[] {
    return [
      {
        id: 1,
        title: 'Microsoft Certified: Azure AI-200',
        issuer: 'Microsoft',
        icon: 'cloud',
        order: 1,
        isVisible: true
      },
      {
        id: 2,
        title: 'Angular',
        issuer: 'Udemy',
        icon: 'angular',
        order: 2,
        isVisible: true
      },
      {
        id: 3,
        title: '.NET MAUI',
        issuer: 'Udemy',
        icon: 'mobile',
        order: 3,
        isVisible: true
      }
    ];
  }

  private getMockHomeStats(): HomeStat[] {
    return [
      {
        id: 1,
        number: 3,
        label: 'Years Experience',
        suffix: '+',
        icon: 'star',
        order: 1,
        isVisible: true
      },
      {
        id: 2,
        number: 20,
        label: 'API Endpoints Built',
        suffix: '+',
        icon: 'gear',
        order: 2,
        isVisible: true
      },
      {
        id: 3,
        number: 90,
        label: 'Test Coverage',
        suffix: '%+',
        icon: 'flask',
        order: 3,
        isVisible: true
      },
      {
        id: 4,
        number: 50,
        label: 'Records Migrated',
        suffix: 'K+',
        icon: 'database',
        order: 4,
        isVisible: true
      }
    ];
  }

  private getMockPageContent(pageName: string): PageContent {
    const content: Record<string, PageContent> = {
      home: {
        id: 1,
        pageName: 'home',
        heroTitle: 'Pratham Kamboj',
        heroSubtitle: 'Software Engineer',
        heroDescription: 'Motivated software developer with a strong passion for learning and exploring emerging technologies. Committed to writing clean, efficient code and delivering reliable, user-focused software solutions.',
        typewriterWords: ['Software Engineer', '.NET Developer', 'Angular Developer', '.NET MAUI Developer'],
        sections: [
          {
            id: 1,
            pageName: 'home',
            sectionName: 'hero',
            title: 'Pratham Kamboj',
            subtitle: 'Full Stack Developer',
            description: 'Crafting elegant solutions to complex problems.',
            order: 1,
            isVisible: true
          },
          {
            id: 2,
            pageName: 'home',
            sectionName: 'stats',
            title: 'My Achievements',
            subtitle: 'Numbers that speak',
            order: 2,
            isVisible: true
          },
          {
            id: 3,
            pageName: 'home',
            sectionName: 'skills',
            title: 'Core Technologies',
            subtitle: 'Tools and technologies I work with',
            order: 3,
            isVisible: true
          },
          {
            id: 4,
            pageName: 'home',
            sectionName: 'cta',
            title: 'Let\'s Build Something Amazing Together',
            subtitle: 'Have a project in mind?',
            description: 'Let\'s discuss how we can work together to bring your ideas to life.',
            order: 4,
            isVisible: true
          }
        ]
      },
      projects: {
        id: 2,
        pageName: 'projects',
        heroTitle: 'My Projects',
        heroSubtitle: 'A showcase of the apps and tools I\'ve built.',
        sections: []
      },
      skills: {
        id: 3,
        pageName: 'skills',
        heroTitle: 'Technical Skills',
        heroSubtitle: 'Technologies and tools I excel at',
        sections: []
      },
      experience: {
        id: 4,
        pageName: 'experience',
        heroTitle: 'Professional Journey',
        heroSubtitle: 'My career path and experiences',
        sections: []
      },
      contact: {
        id: 5,
        pageName: 'contact',
        heroTitle: 'Get In Touch',
        heroSubtitle: 'Let\'s discuss your next project',
        sections: []
      }
    };

    return content[pageName] || {
      id: 0,
      pageName,
      sections: []
    };
  }

  private getMockExperiences(): Experience[] {
    return [
      {
        id: 1,
        icon: 'rocket',
        title: 'Software Engineer',
        company: 'Covalience, Mohali',
        startDate: 'Jan 2024',
        endDate: 'Present',
        description: 'Engineered 20+ backend API endpoints using .NET Web API for "theConnection" member management system (Gideons International), improving system reliability and scalability. Developed and optimized stored procedures, reducing data retrieval time by 30%. Delivered responsive Angular UI components and achieved 90%+ unit test coverage using NUnit. Also built GideonNow, a cross-platform .NET MAUI app. Implemented 10+ custom handlers, integrated native OS features (camera, local storage, notifications), and automated deployments via CI/CD with Firebase App Distribution, reducing release time by 60%.',
        tags: ['.NET Web API', 'Angular', '.NET MAUI', 'SQL Server', 'NUnit', 'CI/CD'],
        position: 'left'
      },
      {
        id: 2,
        icon: 'briefcase',
        title: 'Software Engineer Intern',
        company: 'Covalience, Mohali',
        startDate: 'Jul 2023',
        endDate: 'Dec 2023',
        description: 'Engineered a middleware system integrating Zoho and Monday.com using webhooks and multi-level API calls, automating recruitment workflows and reducing HR effort by 30–40%. Migrated and validated 50,000+ member records from legacy systems for Gideons International with 98%+ data accuracy using FluentValidation and NUnit. Automated report generation with iTextSharp, improving audit reporting efficiency by 60%.',
        tags: ['ASP.NET MVC', 'Webhooks', 'FluentValidation', 'iTextSharp', 'Clean Architecture'],
        position: 'right'
      },
      {
        id: 3,
        icon: 'graduation',
        title: 'B.Tech in Computer Science',
        company: 'Graphic Era Hill University',
        startDate: 'Oct 2020',
        endDate: 'Jul 2024',
        description: 'Bachelor of Technology in Computer Science. Led a hackathon team building an AI-based real-world solution and secured runner-up position. Represented the college in an inter-college eSports tournament, earning second runner-up. Earned certifications in Angular and .NET MAUI while contributing to professional projects.',
        tags: ['Computer Science', 'Hackathon Runner-up', 'Angular Certified', '.NET MAUI Certified'],
        position: 'left'
      }
    ];
  }
}