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
  Experience 
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
          { id: 4, name: 'Entity Framework', category: 'backend', proficiency: 85 }
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
          { id: 8, name: 'HTML/CSS', category: 'frontend', proficiency: 90 }
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
          { id: 12, name: 'Redis', category: 'database', proficiency: 75 }
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
          { id: 16, name: 'CI/CD', category: 'devops', proficiency: 75 }
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
      name: 'Your Name',
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