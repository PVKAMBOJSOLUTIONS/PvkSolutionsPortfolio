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