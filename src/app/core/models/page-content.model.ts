/**
 * Page Content Models
 * Used for dynamic titles, subtitles, and section content
 */
export interface PageSection {
  id: number;
  pageName: string; // 'home', 'about', 'projects', 'skills', 'experience', 'contact'
  sectionName: string; // 'hero', 'stats', 'cta', etc.
  title?: string;
  subtitle?: string;
  description?: string;
  order: number;
  isVisible: boolean;
  metadata?: Record<string, any>;
}

export interface PageContent {
  id: number;
  pageName: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  typewriterWords?: string[]; // Words for typewriter effect
  sections: PageSection[];
}

/**
 * Skills Showcase Model
 * Used for the magnetic skill cards
 */
export interface SkillShowcase {
  id: number;
  icon: string;
  title: string;
  projectCount?: number;
  yearsExperience?: string;
  description: string;
  techStack: string[];
  color?: string;
  order: number;
  isVisible: boolean;
}

/**
 * Home Page Stats Model
 */
export interface HomeStat {
  id: number;
  number: number;
  label: string;
  suffix: string;
  icon?: string;
  order: number;
  isVisible: boolean;
}

