import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  icon: string;
  title: string;
  projectCount?: number;
  yearsExperience?: string;
  description: string;
  techStack: string[];
  gradient: string;
}

@Component({
  selector: 'app-skills-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss']
})
export class SkillsShowcaseComponent {
  
  // Format large numbers (e.g., 1000 -> 1K)
  formatNumber(num?: number): string {
    if (!num) return '0';
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num.toString();
  }
  // You can customize these skills with your own data
  skills: Skill[] = [
    {
      icon: '🎨',
      title: 'Frontend Development',
      projectCount: 25,
      yearsExperience: '5+',
      description: 'Creating beautiful and responsive user interfaces with modern frameworks.',
      techStack: ['Angular', 'React', 'TypeScript', 'TailwindCSS', 'SASS'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: '⚙️',
      title: 'Backend Development',
      projectCount: 20,
      yearsExperience: '4+',
      description: 'Building robust server-side applications and RESTful APIs.',
      techStack: ['.NET Core', 'C#', 'ASP.NET', 'Entity Framework', 'SQL Server'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: '💻',
      title: 'Full Stack Development',
      projectCount: 30,
      yearsExperience: '5+',
      description: 'End-to-end development of web applications from concept to deployment.',
      techStack: ['Angular', '.NET Core', 'TypeScript', 'SQL Server', 'Azure'],
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      icon: '🗄️',
      title: 'Database Management',
      projectCount: 15,
      yearsExperience: '4+',
      description: 'Designing and optimizing database schemas for performance and scalability.',
      techStack: ['SQL Server', 'PostgreSQL', 'Entity Framework', 'Azure SQL'],
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      icon: '☁️',
      title: 'Cloud & DevOps',
      projectCount: 12,
      yearsExperience: '3+',
      description: 'Deploying applications to cloud platforms and implementing CI/CD pipelines.',
      techStack: ['Azure', 'Docker', 'Git', 'Azure DevOps', 'PowerShell'],
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    },
    {
      icon: '🔧',
      title: 'Problem Solving',
      projectCount: 40,
      yearsExperience: '6+',
      description: 'Solving complex technical challenges and optimizing application performance.',
      techStack: ['Algorithms', 'Data Structures', 'Architecture', 'Debugging'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];
}
