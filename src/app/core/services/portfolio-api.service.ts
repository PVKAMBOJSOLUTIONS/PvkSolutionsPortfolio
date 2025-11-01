import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { 
  Project, 
  Skill, 
  SkillCategory, 
  Hobby, 
  Profile, 
  ContactInfo, 
  Experience,
  PageContent,
  SkillShowcase,
  HomeStat
} from '../models';

/**
 * Portfolio API Service
 * Handles all READ-ONLY API calls related to portfolio data
 * All CREATE, UPDATE, DELETE operations are handled through admin console
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioApiService extends BaseApiService {
  
  constructor(http: HttpClient) {
    super(http, '/api/portfolio');
  }

  // ============================================
  // PROJECT ENDPOINTS (READ ONLY)
  // ============================================

  /**
   * Get all projects
   */
  getAllProjects(): Observable<Project[]> {
    return this.get<Project[]>('/projects');
  }

  /**
   * Get project by ID
   */
  getProjectById(id: number): Observable<Project> {
    return this.get<Project>(`/projects/${id}`);
  }

  // ============================================
  // SKILL ENDPOINTS (READ ONLY)
  // ============================================

  /**
   * Get all skills by category
   */
  getAllSkills(): Observable<SkillCategory[]> {
    return this.get<SkillCategory[]>('/skills');
  }

  /**
   * Get skills by category
   */
  getSkillsByCategory(category: string): Observable<Skill[]> {
    return this.get<Skill[]>('/skills', this.buildParams({ category }));
  }

  // ============================================
  // HOBBY ENDPOINTS (READ ONLY)
  // ============================================

  /**
   * Get all hobbies
   */
  getAllHobbies(): Observable<Hobby[]> {
    return this.get<Hobby[]>('/hobbies');
  }

  /**
   * Get hobby by ID
   */
  getHobbyById(id: number): Observable<Hobby> {
    return this.get<Hobby>(`/hobbies/${id}`);
  }

  // ============================================
  // PROFILE ENDPOINTS (READ ONLY)
  // ============================================

  /**
   * Get profile information
   */
  getProfile(): Observable<Profile> {
    return this.get<Profile>('/profile');
  }

  // ============================================
  // CONTACT INFO ENDPOINTS
  // ============================================

  /**
   * Get contact information
   */
  getContactInfo(): Observable<ContactInfo> {
    return this.get<ContactInfo>('/contact');
  }

  /**
   * Send contact message (users can send messages)
   */
  sendMessage(message: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Observable<{ success: boolean; message: string }> {
    return this.post<{ success: boolean; message: string }>('/contact/send', message);
  }

  // ============================================
  // EXPERIENCE ENDPOINTS (READ ONLY)
  // ============================================

  /**
   * Get all experiences
   */
  getAllExperiences(): Observable<Experience[]> {
    return this.get<Experience[]>('/experiences');
  }

  /**
   * Get experience by ID
   */
  getExperienceById(id: number): Observable<Experience> {
    return this.get<Experience>(`/experiences/${id}`);
  }

  // ============================================
  // PAGE CONTENT ENDPOINTS (READ ONLY)
  // ============================================

  /**
   * Get page content by page name
   */
  getPageContent(pageName: string): Observable<PageContent> {
    return this.get<PageContent>(`/page-content/${pageName}`);
  }

  /**
   * Get all page content
   */
  getAllPageContent(): Observable<PageContent[]> {
    return this.get<PageContent[]>('/page-content');
  }

  // ============================================
  // SKILL SHOWCASE ENDPOINTS (READ ONLY)
  // ============================================

  /**
   * Get all skill showcases
   */
  getAllSkillShowcases(): Observable<SkillShowcase[]> {
    return this.get<SkillShowcase[]>('/skill-showcases');
  }

  /**
   * Get skill showcase by ID
   */
  getSkillShowcaseById(id: number): Observable<SkillShowcase> {
    return this.get<SkillShowcase>(`/skill-showcases/${id}`);
  }

  // ============================================
  // HOME STATS ENDPOINTS (READ ONLY)
  // ============================================

  /**
   * Get all home stats
   */
  getAllHomeStats(): Observable<HomeStat[]> {
    return this.get<HomeStat[]>('/home-stats');
  }

  /**
   * Get home stat by ID
   */
  getHomeStatById(id: number): Observable<HomeStat> {
    return this.get<HomeStat>(`/home-stats/${id}`);
  }
}
