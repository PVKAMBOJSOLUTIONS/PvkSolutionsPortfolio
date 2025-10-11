import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  icon: string;
  title: string;
  projectCount: number;
  yearsExperience: string;
  description: string;
  techStack: string[];
  gradient: string;
}

@Component({
  selector: 'app-skills-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.css']
})
export class SkillsShowcaseComponent {
  skills: Skill[] = [
    {
      icon: '🤖',
      title: 'AI/ML',
      projectCount: 8,
      yearsExperience: '3+',
      description: 'Specialized in building intelligent systems and data-driven solutions.',
      techStack: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: '📊',
      title: 'Data Science',
      projectCount: 12,
      yearsExperience: '4+',
      description: 'Expert in extracting insights from complex datasets and building predictive models.',
      techStack: ['Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Statistics'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: '⚡',
      title: 'DevOps',
      projectCount: 10,
      yearsExperience: '3+',
      description: 'Streamlining development workflows and automating deployment processes.',
      techStack: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'Terraform', 'Monitoring'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: '💻',
      title: 'Web Development',
      projectCount: 15,
      yearsExperience: '5+',
      description: 'Building modern, responsive web applications with cutting-edge technologies.',
      techStack: ['Angular', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'REST APIs'],
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      icon: '📱',
      title: 'Mobile Dev',
      projectCount: 9,
      yearsExperience: '3+',
      description: 'Creating seamless mobile experiences across iOS and Android platforms.',
      techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'App Store'],
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      icon: '☁️',
      title: 'Cloud Architecture',
      projectCount: 11,
      yearsExperience: '4+',
      description: 'Designing scalable and resilient cloud infrastructure solutions.',
      techStack: ['AWS', 'Azure', 'GCP', 'Lambda', 'S3', 'CloudFormation'],
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    }
  ];
}
