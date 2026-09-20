import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('explains the email draft flow and links to privacy information', () => {
    expect(fixture.nativeElement.textContent).toContain('Nothing is submitted to this website');
    expect(fixture.nativeElement.querySelector('button[type="submit"]').textContent).toContain('Open email draft');
    expect(fixture.nativeElement.querySelector('a[href="/privacy"]')).not.toBeNull();
  });

  it('marks invalid inputs accessibly without opening a draft', () => {
    component.onSubmit();
    fixture.detectChanges();
    expect(component.draftPrepared).toBeFalse();
    expect(fixture.nativeElement.querySelectorAll('[aria-invalid="true"]').length).toBe(4);
  });
});
