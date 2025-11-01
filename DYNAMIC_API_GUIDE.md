# Dynamic Portfolio API Integration Guide

This guide explains how the portfolio application connects to the API for dynamic content. **This is a READ-ONLY API** - all CREATE, UPDATE, and DELETE operations are managed through a separate admin console.

## Overview

The application fetches dynamic content through READ-ONLY API services for:
- **Page Content**: Titles, subtitles, descriptions for all pages
- **Projects**: Read-only project data
- **Skills**: Categories and individual skills (read-only)
- **Skill Showcases**: Magnetic skill cards (used in Skills page)
- **Experiences**: Timeline entries (read-only)
- **Hobbies**: Hobby items (read-only)
- **Home Stats**: Statistics displayed on homepage
- **Profile**: Personal information (read-only)
- **Contact Info**: Contact details and social links (read-only)
- **Contact Messages**: Users can send contact messages (POST only)

## API Endpoints

### Base URL
All endpoints are prefixed with `/api/portfolio`

### Page Content Endpoints

#### Get Page Content
```
GET /api/portfolio/page-content/{pageName}
```
Returns page content for a specific page (home, projects, skills, experience, contact)

**Response:**
```json
{
  "id": 1,
  "pageName": "home",
  "heroTitle": "Your Name",
  "heroSubtitle": "Full Stack Developer",
  "heroDescription": "Crafting elegant solutions...",
  "typewriterWords": ["Full Stack Developer", "Problem Solver"],
  "sections": [
    {
      "id": 1,
      "pageName": "home",
      "sectionName": "hero",
      "title": "Your Name",
      "subtitle": "Full Stack Developer",
      "description": "...",
      "order": 1,
      "isVisible": true,
      "metadata": {}
    }
  ]
}
```

**Note:** CREATE and UPDATE operations for page content are handled through the admin console.

### Projects Endpoints

#### Get All Projects
```
GET /api/portfolio/projects
```

#### Get Project by ID
```
GET /api/portfolio/projects/{id}
```

**Note:** CREATE, UPDATE, and DELETE operations for projects are handled through the admin console.

### Skill Showcases Endpoints

#### Get All Skill Showcases
```
GET /api/portfolio/skill-showcases
```

#### Get Skill Showcase by ID
```
GET /api/portfolio/skill-showcases/{id}
```

**Note:** CREATE, UPDATE, and DELETE operations for skill showcases are handled through the admin console.

### Home Stats Endpoints

#### Get All Home Stats
```
GET /api/portfolio/home-stats
```

#### Get Home Stat by ID
```
GET /api/portfolio/home-stats/{id}
```

**Note:** CREATE, UPDATE, and DELETE operations for home stats are handled through the admin console.

### Skills Endpoints

#### Get All Skills (by category)
```
GET /api/portfolio/skills
```

#### Get Skills by Category
```
GET /api/portfolio/skills?category=backend
```

**Note:** CREATE, UPDATE, and DELETE operations for skills are handled through the admin console.

### Experiences Endpoints

#### Get All Experiences
```
GET /api/portfolio/experiences
```

#### Get Experience by ID
```
GET /api/portfolio/experiences/{id}
```

**Note:** CREATE, UPDATE, and DELETE operations for experiences are handled through the admin console.

### Hobbies Endpoints

#### Get All Hobbies
```
GET /api/portfolio/hobbies
```

#### Get Hobby by ID
```
GET /api/portfolio/hobbies/{id}
```

**Note:** CREATE, UPDATE, and DELETE operations for hobbies are handled through the admin console.

### Profile Endpoints

#### Get Profile
```
GET /api/portfolio/profile
```

**Note:** UPDATE operations for profile are handled through the admin console.

### Contact Info Endpoints

#### Get Contact Info
```
GET /api/portfolio/contact
```

**Note:** UPDATE operations for contact info are handled through the admin console.

#### Send Contact Message
```
POST /api/portfolio/contact/send
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello..."
}
```

## Usage in Components

### Enable API Mode

In your `app.component.ts` or initialization:

```typescript
import { PortfolioService } from './core/services/portfolio.service';

constructor(private portfolioService: PortfolioService) {
  // Enable API mode when backend is ready
  this.portfolioService.enableApiMode();
}
```

### Example: Using Page Content in Home Component

```typescript
import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { PageContent, HomeStat } from '../../core/models';

@Component({...})
export class HomeComponent implements OnInit {
  pageContent: PageContent | null = null;
  stats: HomeStat[] = [];
  
  constructor(private portfolioService: PortfolioService) {}
  
  ngOnInit() {
    // Load page content
    this.portfolioService.getPageContent('home').subscribe({
      next: (content) => {
        this.pageContent = content;
        // Use content.heroTitle, content.typewriterWords, etc.
      }
    });
    
    // Load home stats
    this.portfolioService.getHomeStats().subscribe({
      next: (stats) => {
        this.stats = stats.filter(s => s.isVisible).sort((a, b) => a.order - b.order);
      }
    });
  }
}
```

### Example: Using Skill Showcases in Skills Component

```typescript
import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SkillShowcase } from '../../core/models';

@Component({...})
export class SkillsShowcaseComponent implements OnInit {
  skills: SkillShowcase[] = [];
  
  constructor(private portfolioService: PortfolioService) {}
  
  ngOnInit() {
    this.portfolioService.getSkillShowcases().subscribe({
      next: (showcases) => {
        this.skills = showcases
          .filter(s => s.isVisible)
          .sort((a, b) => a.order - b.order);
      }
    });
  }
}
```

### Note on Data Management

**All CREATE, UPDATE, and DELETE operations are handled through the admin console.** The portfolio frontend is read-only and only fetches data from the API.

## Environment Configuration

Update `src/enviornment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000' // Your backend API URL
};
```

For production, update `src/enviornment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com'
};
```

## Data Models

All models are defined in `src/app/core/models/`:

- `PageContent` - Page titles, subtitles, sections
- `PageSection` - Individual sections within pages
- `Project` - Project data
- `SkillShowcase` - Magnetic skill cards
- `HomeStat` - Homepage statistics
- `Skill` - Individual skills
- `SkillCategory` - Grouped skills
- `Experience` - Timeline entries
- `Hobby` - Hobby items
- `Profile` - Profile information
- `ContactInfo` - Contact details

## Migration Steps

1. **Backend Setup**: Create your backend API matching the endpoints above
2. **Enable API Mode**: Call `portfolioService.enableApiMode()` in your app initialization
3. **Update Environment**: Set `apiUrl` in environment files
4. **Test Endpoints**: Verify all CRUD operations work
5. **Update Components**: Replace static data with service calls (see examples above)
6. **Remove Mock Data**: Optionally remove mock data methods once API is working

## Notes

- All endpoints return Observable<T> for async operations
- Error handling is centralized in BaseApiService
- Mock data is available when `useApi = false` for development
- All endpoints support proper HTTP status codes
- CORS must be enabled on your backend API

