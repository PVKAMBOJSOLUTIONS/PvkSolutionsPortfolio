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
  Experience 
} from '../models';

/**
 * Portfolio API Service
 * Handles all API calls related to portfolio data
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioApiService extends BaseApiService {
  
  constructor(http: HttpClient) {
    super(http, '/api/portfolio');
  }

  // ============================================
  // PROJECT ENDPOINTS
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

  /**
   * Create a new project
   */
  createProject(project: Project): Observable<Project> {
    return this.post<Project>('/projects', project);
  }

  /**
   * Update an existing project
   */
  updateProject(id: number, project: Partial<Project>): Observable<Project> {
    return this.put<Project>(`/projects/${id}`, project);
  }

  /**
   * Delete a project
   */
  deleteProject(id: number): Observable<void> {
    return this.delete<void>(`/projects/${id}`);
  }

  // ============================================
  // SKILL ENDPOINTS
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

  /**
   * Create or update skills
   */
  upsertSkills(skills: SkillCategory[]): Observable<SkillCategory[]> {
    return this.post<SkillCategory[]>('/skills', skills);
  }

  // ============================================
  // HOBBY ENDPOINTS
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

  /**
   * Create a new hobby
   */
  createHobby(hobby: Hobby): Observable<Hobby> {
    return this.post<Hobby>('/hobbies', hobby);
  }

  // ============================================
  // PROFILE ENDPOINTS
  // ============================================

  /**
   * Get profile information
   */
  getProfile(): Observable<Profile> {
    return this.get<Profile>('/profile');
  }

  /**
   * Update profile information
   */
  updateProfile(profile: Partial<Profile>): Observable<Profile> {
    return this.put<Profile>('/profile', profile);
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
   * Update contact information
   */
  updateContactInfo(contactInfo: Partial<ContactInfo>): Observable<ContactInfo> {
    return this.put<ContactInfo>('/contact', contactInfo);
  }

  /**
   * Send contact message
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
  // EXPERIENCE ENDPOINTS
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

  /**
   * Create a new experience
   */
  createExperience(experience: Experience): Observable<Experience> {
    return this.post<Experience>('/experiences', experience);
  }

  /**
   * Update an existing experience
   */
  updateExperience(id: number, experience: Partial<Experience>): Observable<Experience> {
    return this.put<Experience>(`/experiences/${id}`, experience);
  }

  /**
   * Delete an experience
   */
  deleteExperience(id: number): Observable<void> {
    return this.delete<void>(`/experiences/${id}`);
  }
}

