export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number; // 0-100
  icon?: string;
}

export interface SkillCategory {
  category: string;
  displayName: string;
  icon: string;
  skills: Skill[];
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  year?: string;
  icon: string;
  credentialUrl?: string;
  order: number;
  isVisible: boolean;
}