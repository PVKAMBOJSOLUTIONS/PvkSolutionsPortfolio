import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCardComponent } from './project-card.component';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProjectCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.project = { id: 1, title: 'Project', description: 'Description', icon: '', tags: ['Angular'], status: 'draft', createdAt: new Date(), updatedAt: new Date() };
    fixture.detectChanges();
  });

  it('provides native expandable details and an honest demo status', () => {
    expect(fixture.nativeElement.querySelector('details summary')).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('No public demo is currently linked');
    expect(fixture.nativeElement.textContent).toContain('In development');
    expect(fixture.nativeElement.querySelector('.project-links')).toBeNull();
  });

  it('shows supplied demo and source links without inventing URLs', () => {
    component.project.demoUrl = '/demo';
    component.project.githubUrl = '/source';
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.project-links a');
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toBe('/demo');
    expect(links[0].getAttribute('rel')).toBe('noopener noreferrer');
  });
});
