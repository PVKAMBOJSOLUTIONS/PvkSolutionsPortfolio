import { Component, OnInit } from '@angular/core';

import { Profile } from '../../core/models';
import { PortfolioService } from '../../core/services/portfolio.service';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  profile: Profile | null = null;

  // About paragraphs (can be moved to service/API later)
  aboutParagraphs = [
    "I'm a passionate Full Stack Developer with expertise in .NET and Angular. With several years of experience in building enterprise-level applications, I specialize in creating scalable, maintainable, and user-friendly web solutions.",
    "My journey in software development started with a curiosity about how things work behind the scenes. Today, I leverage modern technologies to solve complex business problems and deliver exceptional value to users.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community."
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getProfile().subscribe(profile => {
      this.profile = profile;
    });
  }
}
