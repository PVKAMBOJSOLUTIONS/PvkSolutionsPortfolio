# API Service Architecture

This directory contains the API service architecture for the portfolio application.

## Architecture Overview

```
core/
  services/
    base-api.service.ts          # Base service with common HTTP operations
    portfolio-api.service.ts     # Portfolio-specific API endpoints
    portfolio.service.ts         # Business logic layer (uses API or mock data)
    http-error.interceptor.ts   # Global HTTP error handling
    api.service.ts              # Legacy service (can be removed)
    interfaces/
      api-response.interface.ts  # Standard API response interfaces
```

## Service Layer Architecture

### 1. BaseApiService (Abstract Base Class)
- **Purpose**: Provides common HTTP operations for all services
- **Features**:
  - GET, POST, PUT, DELETE, PATCH methods
  - Automatic retry logic
  - Centralized error handling
  - Query parameter building
  - Custom header management

### 2. PortfolioApiService (Concrete Implementation)
- **Purpose**: Portfolio-specific API endpoints
- **Extends**: BaseApiService
- **Endpoints**:
  - Projects: CRUD operations
  - Skills: Get by category
  - Hobbies: CRUD operations
  - Profile: Get/Update
  - Contact: Get/Update/Send Message
  - Experience: CRUD operations

### 3. PortfolioService (Business Logic Layer)
- **Purpose**: Orchestrates data flow and business logic
- **Features**:
  - Toggle between API and mock data
  - Provides seamless transition from development to production
  - Maintains existing component interfaces

## Usage

### Enable API Mode

```typescript
// In your component or app initialization
constructor(private portfolioService: PortfolioService) {
  // Enable API mode when backend is ready
  portfolioService.enableApiMode();
}
```

### Making API Calls

```typescript
// Get all projects
this.portfolioService.getProjects().subscribe(projects => {
  console.log(projects);
});

// Get project by ID
this.portfolioService.getProjectById(1).subscribe(project => {
  console.log(project);
});
```

## API Endpoints

### Projects
- `GET /api/portfolio/projects` - Get all projects
- `GET /api/portfolio/projects/:id` - Get project by ID
- `POST /api/portfolio/projects` - Create project
- `PUT /api/portfolio/projects/:id` - Update project
- `DELETE /api/portfolio/projects/:id` - Delete project

### Skills
- `GET /api/portfolio/skills` - Get all skills by category
- `GET /api/portfolio/skills?category=backend` - Get skills by category

### Hobbies
- `GET /api/portfolio/hobbies` - Get all hobbies
- `GET /api/portfolio/hobbies/:id` - Get hobby by ID
- `POST /api/portfolio/hobbies` - Create hobby

### Profile
- `GET /api/portfolio/profile` - Get profile
- `PUT /api/portfolio/profile` - Update profile

### Contact
- `GET /api/portfolio/contact` - Get contact info
- `PUT /api/portfolio/contact` - Update contact info
- `POST /api/portfolio/contact/send` - Send message

### Experience
- `GET /api/portfolio/experiences` - Get all experiences
- `GET /api/portfolio/experiences/:id` - Get experience by ID
- `POST /api/portfolio/experiences` - Create experience
- `PUT /api/portfolio/experiences/:id` - Update experience
- `DELETE /api/portfolio/experiences/:id` - Delete experience

## Error Handling

All API calls are automatically handled by the BaseApiService with:
- Automatic retry (configurable per request)
- Centralized error logging
- Consistent error messages
- HTTP status code handling

## Configuration

Update `src/enviornment.ts` to set your API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000' // Your API URL
};
```

## Migration from Mock to API

1. Keep `useApi = false` during development
2. Test with mock data
3. Deploy backend and update `apiUrl` in environment
4. Enable API mode: `portfolioService.enableApiMode()`
5. Test all endpoints
6. Remove mock data methods (optional)

## Adding New Endpoints

1. Add method to `PortfolioApiService`
2. Add corresponding method to `PortfolioService`
3. Update this README with new endpoint documentation

