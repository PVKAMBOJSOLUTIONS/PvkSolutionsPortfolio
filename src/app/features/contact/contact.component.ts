import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface ContactMethod {
  icon: string;
  title: string;
  value: string;
  link: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  contactMethods: ContactMethod[] = [
    {
      icon: '📧',
      title: 'Email',
      value: 'your.email@example.com',
      link: 'mailto:your.email@example.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Your City, Country',
      link: '#'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/yourprofile',
      link: 'https://linkedin.com/in/yourprofile'
    }
  ];

  socialLinks = [
    { icon: 'github', url: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: 'linkedin', url: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
    { icon: 'twitter', url: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: 'instagram', url: 'https://instagram.com/yourusername', label: 'Instagram' }
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,private router:Router

  ) {}


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      }, 2000);

      // In production, replace with actual API call:
      // this.contactService.sendMessage(this.contactForm.value).subscribe(
      //   response => {
      //     this.isSubmitting = false;
      //     this.submitSuccess = true;
      //     this.contactForm.reset();
      //   },
      //   error => {
      //     this.isSubmitting = false;
      //     this.submitError = true;
      //   }
      // );
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  hasError(field: string, error: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

}