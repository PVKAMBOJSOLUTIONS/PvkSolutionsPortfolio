export interface Skill {
  id: number;
  name: string;
  category: 'backend' | 'frontend' | 'database' | 'devops';
  proficiency: number; // 0-100
  icon?: string;
}

export interface SkillCategory {
  category: string;
  displayName: string;
  icon: string;
  skills: Skill[];
}