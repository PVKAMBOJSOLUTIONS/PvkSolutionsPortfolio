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
  HomeStat
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
        title: 'theConnection — Member Management System',
        description: 'Member tool and management system for Gideons International. Engineered 20+ backend API endpoints with .NET Web API, optimized stored procedures cutting data retrieval time by 30%, and delivered responsive Angular UI with 90%+ NUnit test coverage.',
        icon: '🤝',
        tags: ['.NET Web API', 'Angular', 'SQL Server', 'NUnit'],
        status: 'published',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-06-01')
      },
      {
        id: 2,
        title: 'GideonNow — Cross-Platform Mobile App',
        description: '.NET MAUI app for Gideons International with 10+ custom handlers and validation services. Integrated native OS features (camera, local storage, notifications) and automated deployments via CI/CD with Firebase App Distribution, reducing release time by 60%.',
        icon: '📱',
        tags: ['.NET MAUI', 'XAML', 'MVVM', 'CI/CD', 'Firebase'],
        status: 'published',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-06-01')
      },
      {
        id: 3,
        title: 'Zoho → Monday.com Integration',
        description: 'Middleware system integrating Zoho and Monday.com using webhooks and multi-level API calls. Automated recruitment workflows, reducing HR effort by 30–40%, built with FluentValidation and Clean Architecture principles.',
        icon: '�',
        tags: ['.NET', 'Webhooks', 'REST APIs', 'FluentValidation'],
        status: 'published',
        createdAt: new Date('2023-07-01'),
        updatedAt: new Date('2023-12-01')
      },
      {
        id: 4,
        title: 'Data Migration System',
        description: 'ASP.NET MVC system for Gideons International that migrated and validated 50,000+ member records from legacy systems with 98%+ accuracy. Automated report generation with iTextSharp improved audit efficiency by 60%.',
        icon: '🗄️',
        tags: ['ASP.NET MVC', 'SQL Server', 'FluentValidation', 'iTextSharp'],
        status: 'published',
        createdAt: new Date('2023-07-01'),
        updatedAt: new Date('2023-12-01')
      }
    ];
  }

  private getMockSkills(): SkillCategory[] {
    return [
      {
        category: 'languages',
        displayName: 'Languages',
        icon: '💻',
        skills: [
          { id: 1, name: 'C#', category: 'languages', proficiency: 95 },
          { id: 2, name: 'SQL', category: 'languages', proficiency: 90 },
          { id: 3, name: 'TypeScript', category: 'languages', proficiency: 88 },
          { id: 4, name: 'JavaScript', category: 'languages', proficiency: 85 },
          { id: 5, name: 'XAML', category: 'languages', proficiency: 80 }
        ]
      },
      {
        category: 'frameworks',
        displayName: 'Frameworks & Patterns',
        icon: '⚙️',
        skills: [
          { id: 6, name: 'ASP.NET MVC', category: 'frameworks', proficiency: 90 },
          { id: 7, name: '.NET Web API', category: 'frameworks', proficiency: 92 },
          { id: 8, name: 'Angular', category: 'frameworks', proficiency: 88 },
          { id: 9, name: '.NET MAUI (MVVM)', category: 'frameworks', proficiency: 82 },
          { id: 10, name: 'Clean Architecture', category: 'frameworks', proficiency: 85 },
          { id: 11, name: 'FluentValidation', category: 'frameworks', proficiency: 85 },
          { id: 12, name: 'NUnit', category: 'frameworks', proficiency: 88 }
        ]
      },
      {
        category: 'technologies',
        displayName: 'Technologies & Tools',
        icon: '�️',
        skills: [
          { id: 13, name: '.NET / .NET Core', category: 'technologies', proficiency: 92 },
          { id: 14, name: 'Microsoft SQL Server', category: 'technologies', proficiency: 88 },
          { id: 15, name: 'SQLite', category: 'technologies', proficiency: 80 },
          { id: 16, name: 'Git / Version Control', category: 'technologies', proficiency: 90 },
          { id: 17, name: 'CI/CD Pipelines', category: 'technologies', proficiency: 82 },
          { id: 18, name: 'Firebase App Distribution', category: 'technologies', proficiency: 78 },
          { id: 19, name: 'iTextSharp', category: 'technologies', proficiency: 75 },
          { id: 20, name: 'Webhooks & REST APIs', category: 'technologies', proficiency: 88 }
        ]
      }
    ];
  }

  private getMockHobbies(): Hobby[] {
    return [
      { 
        id: 1, 
        title: 'Reading Tech Blogs', 
        description: 'Staying updated with the latest trends in software development and exploring new technologies.', 
        icon: '📚' 
      },
      { 
        id: 2, 
        title: 'Gaming', 
        description: 'Enjoying strategy games and exploring game mechanics and design patterns.', 
        icon: '🎮' 
      },
      { 
        id: 3, 
        title: 'Travel', 
        description: 'Exploring new places, cultures, and cuisines around the world.', 
        icon: '✈️' 
      },
      { 
        id: 4, 
        title: 'Fitness', 
        description: 'Regular workouts and maintaining a healthy lifestyle to stay productive.', 
        icon: '🏃' 
      },
      { 
        id: 5, 
        title: 'Music', 
        description: 'Listening to various genres while coding or relaxing after work.', 
        icon: '🎵' 
      },
      { 
        id: 6, 
        title: 'Mentoring', 
        description: 'Helping junior developers grow and sharing knowledge with the community.', 
        icon: '🤝' 
      }
    ];
  }

  private getMockProfile(): Profile {
    return {
      id: 1,
      name: 'Pratham Kamboj',
      title: 'Software Engineer',
      tagline: 'Building scalable web & mobile applications with .NET, Angular & .NET MAUI',
      bio: 'Motivated software developer with a strong passion for learning and exploring emerging technologies. Committed to writing clean, efficient code and delivering reliable, user-focused software solutions.',
      resumeUrl: '/assets/resume.pdf'
    };
  }

  private getMockContactInfo(): ContactInfo {
    return {
      email: 'prathamkamboj002@gmail.com',
      phone: '+91 90450 88352',
      location: 'Mohali, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/pratham-kamboj', icon: '�' },
        { platform: 'Email', url: 'mailto:prathamkamboj002@gmail.com', icon: '✉️' }
      ]
    };
  }

  private getMockSkillShowcases(): SkillShowcase[] {
    return [
      {
        id: 1,
        icon: '⚙️',
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
        icon: '🎨',
        title: 'Frontend Development',
        projectCount: 10,
        yearsExperience: '2+',
        description: 'Delivering responsive Angular UI components that enhance user engagement and front-end performance. Certified in Angular with hands-on production experience.',
        techStack: ['Angular', 'TypeScript', 'JavaScript', 'HTML/CSS', 'RxJS'],
        order: 2,
        isVisible: true
      },
      {
        id: 3,
        icon: '�',
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
        icon: '🗄️',
        title: 'Database & Data',
        projectCount: 8,
        yearsExperience: '2+',
        description: 'Developed and optimized stored procedures reducing data retrieval time by 30%. Migrated and validated 50,000+ records with 98%+ accuracy.',
        techStack: ['SQL Server', 'T-SQL', 'SQLite', 'Stored Procedures', 'Data Migration'],
        order: 4,
        isVisible: true
      },
      {
        id: 5,
        icon: '🧪',
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
        icon: '�',
        title: 'DevOps & Delivery',
        projectCount: 6,
        yearsExperience: '1+',
        description: 'Automated staging and production deployments using CI/CD pipelines including Firebase App Distribution, reducing release time by 60%.',
        techStack: ['CI/CD', 'Git', 'Firebase App Distribution', 'Webhooks'],
        order: 6,
        isVisible: true
      }
    ];
  }

  private getMockHomeStats(): HomeStat[] {
    return [
      {
        id: 1,
        number: 2,
        label: 'Years Experience',
        suffix: '+',
        icon: '⭐',
        order: 1,
        isVisible: true
      },
      {
        id: 2,
        number: 20,
        label: 'API Endpoints Built',
        suffix: '+',
        icon: '⚙️',
        order: 2,
        isVisible: true
      },
      {
        id: 3,
        number: 90,
        label: 'Test Coverage',
        suffix: '%+',
        icon: '🧪',
        order: 3,
        isVisible: true
      },
      {
        id: 4,
        number: 50,
        label: 'Records Migrated',
        suffix: 'K+',
        icon: '�️',
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
        icon: '🚀',
        title: 'Software Engineer',
        company: 'Covalience, Mohali',
        startDate: 'Jan 2024',
        endDate: 'Present',
        description: 'Engineered 20+ backend API endpoints using .NET Web API for "theConnection" member management system (Gideons International), improving system reliability and scalability. Developed and optimized stored procedures, reducing data retrieval time by 30%. Delivered responsive Angular UI components and achieved 90%+ unit test coverage using NUnit. Also built GideonNow, a cross-platform .NET MAUI app — implemented 10+ custom handlers, integrated native OS features (camera, local storage, notifications), and automated deployments via CI/CD with Firebase App Distribution, reducing release time by 60%.',
        tags: ['.NET Web API', 'Angular', '.NET MAUI', 'SQL Server', 'NUnit', 'CI/CD'],
        position: 'left'
      },
      {
        id: 2,
        icon: '�',
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
        icon: '🎓',
        title: 'B.Tech — Computer Science',
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