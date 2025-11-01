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
        title: 'E-Commerce Platform',
        description: 'Full-featured e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
        icon: '🚀',
        tags: ['.NET Core', 'Angular', 'SQL Server', 'Azure'],
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/username/project',
        status: 'published',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-03-20')
      },
      {
        id: 2,
        title: 'Analytics Dashboard',
        description: 'Real-time business intelligence dashboard with interactive charts, data visualization, and reporting capabilities.',
        icon: '📊',
        tags: ['Angular', 'Chart.js', 'REST API', 'RxJS'],
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/username/project',
        status: 'published',
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-04-15')
      },
      {
        id: 3,
        title: 'Healthcare Management System',
        description: 'Comprehensive patient management system with appointment scheduling, medical records, and billing integration.',
        icon: '🏥',
        tags: ['.NET 6', 'Angular', 'Entity Framework', 'Identity'],
        githubUrl: 'https://github.com/username/project',
        status: 'published',
        createdAt: new Date('2023-11-20'),
        updatedAt: new Date('2024-01-10')
      },
      {
        id: 4,
        title: 'Task Management App',
        description: 'Collaborative task management tool with real-time updates, team collaboration features, and progress tracking.',
        icon: '📱',
        tags: ['Angular', 'SignalR', '.NET Core', 'PostgreSQL'],
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/username/project',
        status: 'published',
        createdAt: new Date('2024-03-05'),
        updatedAt: new Date('2024-05-01')
      },
      {
        id: 5,
        title: 'Authentication Microservice',
        description: 'Secure authentication and authorization service with JWT tokens, OAuth integration, and role-based access control.',
        icon: '🔐',
        tags: ['.NET Core', 'JWT', 'OAuth', 'Redis'],
        githubUrl: 'https://github.com/username/project',
        status: 'published',
        createdAt: new Date('2023-12-01'),
        updatedAt: new Date('2024-02-15')
      },
      {
        id: 6,
        title: 'API Gateway',
        description: 'Scalable API gateway with rate limiting, caching, load balancing, and comprehensive monitoring.',
        icon: '🌐',
        tags: ['Ocelot', '.NET Core', 'Docker', 'Kubernetes'],
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/username/project',
        status: 'published',
        createdAt: new Date('2024-04-10'),
        updatedAt: new Date('2024-06-01')
      }
    ];
  }

  private getMockSkills(): SkillCategory[] {
    return [
      {
        category: 'backend',
        displayName: 'Backend',
        icon: '💻',
        skills: [
          { id: 1, name: '.NET Core / .NET 6+', category: 'backend', proficiency: 95 },
          { id: 2, name: 'C#', category: 'backend', proficiency: 95 },
          { id: 3, name: 'ASP.NET Web API', category: 'backend', proficiency: 90 },
          { id: 4, name: 'Entity Framework', category: 'backend', proficiency: 85 },
          { id: 17, name: 'RESTful APIs', category: 'backend', proficiency: 90 },
          { id: 18, name: 'Microservices', category: 'backend', proficiency: 80 },
          { id: 19, name: 'SignalR', category: 'backend', proficiency: 75 },
          { id: 20, name: 'LINQ', category: 'backend', proficiency: 90 },
          { id: 31, name: 'WebSockets', category: 'backend', proficiency: 75 },
          { id: 32, name: 'Authentication & Authorization', category: 'backend', proficiency: 88 },
          { id: 33, name: 'Unit Testing (xUnit, NUnit)', category: 'backend', proficiency: 85 },
          { id: 34, name: 'Dependency Injection', category: 'backend', proficiency: 92 }
        ]
      },
      {
        category: 'frontend',
        displayName: 'Frontend',
        icon: '🎨',
        skills: [
          { id: 5, name: 'Angular', category: 'frontend', proficiency: 90 },
          { id: 6, name: 'TypeScript', category: 'frontend', proficiency: 90 },
          { id: 7, name: 'RxJS', category: 'frontend', proficiency: 80 },
          { id: 8, name: 'HTML/CSS', category: 'frontend', proficiency: 90 },
          { id: 21, name: 'SCSS/SASS', category: 'frontend', proficiency: 85 },
          { id: 22, name: 'TailwindCSS', category: 'frontend', proficiency: 80 },
          { id: 23, name: 'JavaScript', category: 'frontend', proficiency: 88 },
          { id: 24, name: 'Responsive Design', category: 'frontend', proficiency: 92 },
          { id: 35, name: 'Angular Material', category: 'frontend', proficiency: 85 },
          { id: 36, name: 'State Management', category: 'frontend', proficiency: 82 },
          { id: 37, name: 'Web Components', category: 'frontend', proficiency: 75 },
          { id: 38, name: 'Progressive Web Apps (PWA)', category: 'frontend', proficiency: 78 }
        ]
      },
      {
        category: 'database',
        displayName: 'Database',
        icon: '🗄️',
        skills: [
          { id: 9, name: 'SQL Server', category: 'database', proficiency: 85 },
          { id: 10, name: 'PostgreSQL', category: 'database', proficiency: 75 },
          { id: 11, name: 'MongoDB', category: 'database', proficiency: 70 },
          { id: 12, name: 'Redis', category: 'database', proficiency: 75 },
          { id: 25, name: 'T-SQL', category: 'database', proficiency: 85 },
          { id: 26, name: 'Database Design', category: 'database', proficiency: 80 },
          { id: 27, name: 'Query Optimization', category: 'database', proficiency: 82 },
          { id: 39, name: 'Entity Framework Core', category: 'database', proficiency: 88 },
          { id: 40, name: 'Database Migrations', category: 'database', proficiency: 85 },
          { id: 41, name: 'Indexing Strategies', category: 'database', proficiency: 78 }
        ]
      },
      {
        category: 'devops',
        displayName: 'DevOps & Cloud',
        icon: '☁️',
        skills: [
          { id: 13, name: 'Azure', category: 'devops', proficiency: 80 },
          { id: 14, name: 'Docker', category: 'devops', proficiency: 75 },
          { id: 15, name: 'Git / GitHub', category: 'devops', proficiency: 90 },
          { id: 16, name: 'CI/CD', category: 'devops', proficiency: 75 },
          { id: 28, name: 'Azure DevOps', category: 'devops', proficiency: 78 },
          { id: 29, name: 'PowerShell', category: 'devops', proficiency: 70 },
          { id: 30, name: 'Kubernetes', category: 'devops', proficiency: 65 },
          { id: 42, name: 'Azure App Services', category: 'devops', proficiency: 82 },
          { id: 43, name: 'Azure Functions', category: 'devops', proficiency: 75 },
          { id: 44, name: 'Infrastructure as Code', category: 'devops', proficiency: 70 },
          { id: 45, name: 'Monitoring & Logging', category: 'devops', proficiency: 78 }
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
      title: 'Full Stack .NET Developer',
      tagline: 'Building scalable web applications with Angular & .NET Core',
      bio: 'Passionate about creating clean, efficient code and delivering exceptional user experiences. Specialized in enterprise-level applications with modern technology stacks.',
      resumeUrl: '/assets/resume.pdf'
    };
  }

  private getMockContactInfo(): ContactInfo {
    return {
      email: 'your.email@example.com',
      phone: '+1 (555) 123-4567',
      location: 'Your City, Country',
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/yourusername', icon: '💻' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: '💼' },
        { platform: 'Twitter', url: 'https://twitter.com/yourusername', icon: '🐦' },
        { platform: 'Email', url: 'mailto:your.email@example.com', icon: '✉️' }
      ]
    };
  }

  private getMockSkillShowcases(): SkillShowcase[] {
    return [
      {
        id: 1,
        icon: '🎨',
        title: 'Frontend Development',
        projectCount: 25,
        yearsExperience: '5+',
        description: 'Creating beautiful and responsive user interfaces with modern frameworks. Specialized in building scalable single-page applications with focus on user experience and performance optimization.',
        techStack: ['Angular', 'React', 'TypeScript', 'TailwindCSS', 'SASS'],
        order: 1,
        isVisible: true
      },
      {
        id: 2,
        icon: '⚙️',
        title: 'Backend Development',
        projectCount: 20,
        yearsExperience: '4+',
        description: 'Building robust server-side applications and RESTful APIs. Expertise in designing scalable architectures and implementing secure authentication systems.',
        techStack: ['.NET Core', 'C#', 'ASP.NET', 'Entity Framework', 'SQL Server'],
        order: 2,
        isVisible: true
      },
      {
        id: 3,
        icon: '💻',
        title: 'Full Stack Development',
        projectCount: 30,
        yearsExperience: '5+',
        description: 'End-to-end development of web applications from concept to deployment. Proven track record of delivering complete solutions on time and within budget.',
        techStack: ['Angular', '.NET Core', 'TypeScript', 'SQL Server', 'Azure'],
        order: 3,
        isVisible: true
      },
      {
        id: 4,
        icon: '🗄️',
        title: 'Database Management',
        projectCount: 15,
        yearsExperience: '4+',
        description: 'Designing and optimizing database schemas for performance and scalability. Expert in query optimization and data modeling best practices.',
        techStack: ['SQL Server', 'PostgreSQL', 'Entity Framework', 'Azure SQL'],
        order: 4,
        isVisible: true
      },
      {
        id: 5,
        icon: '☁️',
        title: 'Cloud & DevOps',
        projectCount: 12,
        yearsExperience: '3+',
        description: 'Deploying applications to cloud platforms and implementing CI/CD pipelines. Skilled in containerization and infrastructure as code.',
        techStack: ['Azure', 'Docker', 'Git', 'Azure DevOps', 'PowerShell'],
        order: 5,
        isVisible: true
      },
      {
        id: 6,
        icon: '🔧',
        title: 'Problem Solving',
        projectCount: 40,
        yearsExperience: '6+',
        description: 'Solving complex technical challenges and optimizing application performance. Strong analytical skills and systematic approach to debugging.',
        techStack: ['Algorithms', 'Data Structures', 'Architecture', 'Debugging'],
        order: 6,
        isVisible: true
      }
    ];
  }

  private getMockHomeStats(): HomeStat[] {
    return [
      {
        id: 1,
        number: 50,
        label: 'Projects Completed',
        suffix: '+',
        icon: '✨',
        order: 1,
        isVisible: true
      },
      {
        id: 2,
        number: 5,
        label: 'Years Experience',
        suffix: '+',
        icon: '⭐',
        order: 2,
        isVisible: true
      },
      {
        id: 3,
        number: 100,
        label: 'Happy Clients',
        suffix: '+',
        icon: '🎉',
        order: 3,
        isVisible: true
      },
      {
        id: 4,
        number: 20,
        label: 'Technologies',
        suffix: '+',
        icon: '🚀',
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
        heroTitle: 'Your Name',
        heroSubtitle: 'Full Stack Developer',
        heroDescription: 'Crafting elegant solutions to complex problems. Passionate about building scalable web applications and delivering exceptional user experiences.',
        typewriterWords: ['Full Stack Developer', 'Problem Solver', 'Tech Enthusiast', 'Creative Thinker'],
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
        title: 'Senior Full Stack Developer',
        company: 'Tech Innovators Inc.',
        startDate: 'Jan 2023',
        endDate: 'Present',
        description: 'Leading development teams and architecting scalable solutions for enterprise clients. Implementing best practices and mentoring junior developers.',
        tags: ['.NET Core', 'Angular', 'Azure', 'Docker', 'TypeScript'],
        position: 'left'
      },
      {
        id: 2,
        icon: '💼',
        title: 'Full Stack Developer',
        company: 'Digital Solutions Ltd.',
        startDate: 'Jun 2021',
        endDate: 'Dec 2022',
        description: 'Developed and maintained multiple client projects with focus on performance optimization and user experience.',
        tags: ['Angular', '.NET Core', 'SQL Server', 'Redis'],
        position: 'right'
      },
      {
        id: 3,
        icon: '💻',
        title: 'Frontend Developer',
        company: 'Creative Web Agency',
        startDate: 'Mar 2020',
        endDate: 'May 2021',
        description: 'Created responsive and interactive user interfaces for various clients across different industries.',
        tags: ['Angular', 'TypeScript', 'SASS', 'JavaScript'],
        position: 'left'
      },
      {
        id: 4,
        icon: '🌱',
        title: 'Junior Web Developer',
        company: 'StartUp Ventures',
        startDate: 'Aug 2019',
        endDate: 'Feb 2020',
        description: 'Started professional journey building websites and learning modern web development frameworks and best practices.',
        tags: ['HTML/CSS', 'JavaScript', 'jQuery', 'Bootstrap'],
        position: 'right'
      },
      {
        id: 5,
        icon: '🎓',
        title: 'Web Development Intern',
        company: 'Tech Academy',
        startDate: 'Jan 2019',
        endDate: 'Jul 2019',
        description: 'Intensive training program covering full-stack web development fundamentals and modern development practices.',
        tags: ['HTML/CSS', 'JavaScript', 'Git', 'SQL'],
        position: 'left'
      },
      {
        id: 6,
        icon: '📚',
        title: 'Computer Science Degree',
        company: 'University of Technology',
        startDate: 'Sep 2015',
        endDate: 'Jun 2019',
        description: 'Comprehensive education in computer science fundamentals, algorithms, and software engineering principles.',
        tags: ['Algorithms', 'Data Structures', 'OOP', 'Databases'],
        position: 'right'
      }
    ];
  }
}