# API Service Architecture - Complete Setup

## ✅ What Was Fixed

### 1. Experience Component Alignment
- **Fixed text alignment** in wave timeline cards
- Added `text-align: left` and `direction: ltr` to all text elements
- Added `word-wrap: break-word` to prevent text overflow
- Fixed `.wave-card`, `.wave-info`, `.wave-desc` alignment

### 2. API Service Architecture Created

#### Created Files:
1. **`src/app/core/services/base-api.service.ts`**
   - Abstract base class with common HTTP operations
   - Features: GET, POST, PUT, DELETE, PATCH
   - Automatic retry logic
   - Centralized error handling
   - Query parameter building
   - Custom header management

2. **`src/app/core/services/portfolio-api.service.ts`**
   - Concrete implementation extending BaseApiService
   - All CRUD operations for:
     - Projects
     - Skills
     - Hobbies
     - Profile
     - Contact Info
     - Experience

3. **`src/app/core/services/http-error.interceptor.ts`**
   - Global HTTP error interceptor
   - Centralized error logging
   - Automatic error handling for all requests

4. **`src/app/core/services/interfaces/api-response.interface.ts`**
   - Standard response interfaces
   - Paginated response support
   - Error response interface

5. **`src/app/core/services/README.md`**
   - Complete documentation
   - Usage examples
   - API endpoints list
   - Migration guide

#### Updated Files:
1. **`src/app/core/services/portfolio.service.ts`**
   - Added toggle between API and mock data
   - Uses `PortfolioApiService` when API mode is enabled
   - Maintains backward compatibility
   - Added `enableApiMode()` and `disableApiMode()` methods

2. **`src/app/app.config.ts`**
   - Registered HTTP error interceptor
   - Configured HTTP client with interceptor support

## 🏗️ Architecture Design

```
┌─────────────────────────────────────────────────────────┐
│                    Components                           │
│  (Home, Skills, Projects, etc.)                        │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│              PortfolioService (Facade)                  │
│  • Switchable: API or Mock data                        │
│  • Business logic orchestration                         │
└───────────────────┬─────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌───────────────────┐   ┌───────────────────┐
│ PortfolioApiService│   │   Mock Data        │
│  (Extends Base)   │   │   Functions        │
└───────┬───────────┘   └────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────┐
│          BaseApiService                      │
│  • HTTP methods (GET, POST, PUT, DELETE)     │
│  • Error handling                            │
│  • Retry logic                               │
│  • Header management                         │
└───────┬─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────┐
│      HttpErrorInterceptor                   │
│  • Global error handling                     │
│  • Logging                                  │
└─────────────────────────────────────────────┘
```

## 📝 How to Use

### Development (Mock Data)
Currently using mock data by default. No changes needed.

### Production (API Mode)
When your backend is ready:

1. Update API URL in `src/enviornment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000' // Your .NET API URL
};
```

2. Enable API mode in a component or service:
```typescript
constructor(private portfolioService: PortfolioService) {
  portfolioService.enableApiMode();
}
```

3. All existing components will work seamlessly!

## 🎯 Benefits

1. **Clean Architecture**: Separation of concerns
2. **Maintainable**: Easy to add new endpoints
3. **Testable**: Can switch between mock and real API
4. **Scalable**: Base class can be extended for other services
5. **Error Handling**: Centralized and consistent
6. **Type-Safe**: Full TypeScript support
7. **Documented**: Complete README and interfaces

## 📁 File Structure

```
core/services/
├── base-api.service.ts              # Base HTTP service
├── portfolio-api.service.ts         # Portfolio API endpoints
├── portfolio.service.ts             # Business logic (updated)
├── http-error.interceptor.ts       # Global error handling
├── api.service.ts                   # Legacy (can be removed)
├── interfaces/
│   └── api-response.interface.ts   # Standard interfaces
└── README.md                        # Documentation
```

## 🔧 API Endpoints Ready

All these endpoints are ready to use when you enable API mode:

- **Projects**: GET, POST, PUT, DELETE
- **Skills**: GET by category
- **Hobbies**: GET, POST
- **Profile**: GET, PUT
- **Contact**: GET, PUT, POST (send message)
- **Experience**: GET, POST, PUT, DELETE

## ✨ Experience Component Fixes

- All text is now left-aligned
- Proper text wrapping prevents overflow
- Cards have consistent spacing
- Timeline works perfectly

