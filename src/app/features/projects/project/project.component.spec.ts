import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { Project } from '../../../core/models';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let fixture: ComponentFixture<ProjectComponent>;
  let component: ProjectComponent;
  let service: jasmine.SpyObj<PortfolioService>;
  const projects: Project[] = [
    { id: 1, title: 'Web application', description: 'Member services', icon: '', tags: ['Angular'], status: 'published', createdAt: new Date(), updatedAt: new Date() },
    { id: 2, title: 'Mobile application', description: 'Device integrations', icon: '', tags: ['.NET MAUI'], status: 'published', createdAt: new Date(), updatedAt: new Date() },
    { id: 3, title: 'Infrastructure', description: 'Service orchestration', icon: '', tags: ['Ansible'], status: 'draft', createdAt: new Date(), updatedAt: new Date() }
  ];

  beforeEach(async () => {
    service = jasmine.createSpyObj('PortfolioService', ['getProjects']);
    service.getProjects.and.returnValue(of(projects));
    await TestBed.configureTestingModule({
      imports: [ProjectComponent],
      providers: [{ provide: PortfolioService, useValue: service }]
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
  });

  it('filters by discipline through the visible controls', () => {
    fixture.detectChanges();
    const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('.filter-button'));
    buttons.find(button => button.textContent === 'Mobile')!.click();
    fixture.detectChanges();
    expect(component.displayedProjects.map(project => project.id)).toEqual([2]);
    expect(fixture.nativeElement.querySelector('[aria-pressed="true"]').textContent).toBe('Mobile');
  });

  it('combines case-insensitive technology search with filters', () => {
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = '  angular  ';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.displayedProjects.map(project => project.id)).toEqual([1]);
    component.category = 'Mobile';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No projects found');
  });

  it('limits homepage previews and omits duplicate page headings', () => {
    component.limit = 2;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-project-card').length).toBe(2);
    expect(fixture.nativeElement.querySelector('h1')).toBeNull();
    expect(fixture.nativeElement.querySelector('.project-controls')).toBeNull();
  });

  it('shows a skeleton until projects arrive', () => {
    const pending = new Subject<Project[]>();
    service.getProjects.and.returnValue(pending);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-skeleton')).not.toBeNull();
    pending.next(projects);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-skeleton')).toBeNull();
  });

  it('allows retrying a failed request', () => {
    service.getProjects.and.returnValue(throwError(() => new Error('Unavailable')));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
    service.getProjects.and.returnValue(of(projects));
    fixture.nativeElement.querySelector('.empty-state button').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-project-card').length).toBe(3);
  });
});
