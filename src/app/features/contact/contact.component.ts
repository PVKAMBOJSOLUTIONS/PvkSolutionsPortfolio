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
  submitError = false;

  // Form messages are bundled into a mailto draft addressed to this email
  readonly recipientEmail = 'prathamkamboj002@gmail.com';

  contactMethods: ContactMethod[] = [
    {
      icon: '📧',
      title: 'Email',
      value: 'prathamkamboj002@gmail.com',
      link: 'mailto:prathamkamboj002@gmail.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+91 90450 88352',
      link: 'tel:+919045088352'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Mohali, India',
      link: 'https://www.google.com/maps/search/?api=1&query=Mohali,+Punjab,+India'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/pratham-kamboj',
      link: 'https://linkedin.com/in/pratham-kamboj'
    }
  ];

  socialLinks = [
    { icon: 'linkedin', url: 'https://linkedin.com/in/pratham-kamboj', label: 'LinkedIn' }
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
    if (!this.contactForm.valid) {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitError = false;

    const { name, email, subject, message } = this.contactForm.value;

    // Bundle the form fields into an email draft addressed to the recipient
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message
    ].join('\n');

    const mailtoUrl =
      `mailto:${this.recipientEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    if (isPlatformBrowser(this.platformId)) {
      // Opens the visitor's default mail client with the draft pre-filled
      window.location.href = mailtoUrl;
    }

    this.isSubmitting = false;
    this.contactForm.reset();
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