import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactInfo } from '../../core/models';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactInfo: ContactInfo | null = null;
  
  // Form data
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  formSubmitted = false;
  formSuccess = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getContactInfo().subscribe(info => {
      this.contactInfo = info;
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    
    // Here you would typically send the form data to your API
    console.log('Form submitted:', this.formData);
    
    // Simulate API call
    setTimeout(() => {
      this.formSuccess = true;
      this.resetForm();
    }, 1000);
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    this.formSubmitted = false;
    
    setTimeout(() => {
      this.formSuccess = false;
    }, 3000);
  }
}