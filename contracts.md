# 3D Portfolio - Integration Contracts

## Overview
This document outlines the contracts between frontend and backend for future integration phases.

## Current State
- **Frontend**: Fully functional with mock data
- **Backend**: Not yet implemented (future phase)
- **Data Source**: `/app/frontend/src/mock/portfolioData.js`

## API Contracts (Future Implementation)

### 1. Portfolio Data API

#### GET `/api/portfolio`
**Description**: Fetch complete portfolio data  
**Response**:
```json
{
  "personal": {
    "name": "string",
    "title": "string",
    "tagline": "string",
    "bio": "string",
    "avatar": "string (URL)",
    "linkedIn": "string (URL)",
    "youtube": "string (URL)",
    "email": "string"
  },
  "skills": [
    {
      "name": "string",
      "level": "number (0-100)",
      "category": "string"
    }
  ],
  "projects": [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "technologies": ["string"],
      "image": "string (URL)",
      "link": "string (URL)",
      "featured": "boolean"
    }
  ],
  "achievements": [
    {
      "title": "string",
      "description": "string",
      "icon": "string"
    }
  ]
}
```

### 2. Analytics API (Optional)

#### POST `/api/analytics/interaction`
**Description**: Track user interactions  
**Request Body**:
```json
{
  "eventType": "string (view_zone|interact_object|view_project)",
  "data": {
    "zone": "string",
    "objectId": "string",
    "timestamp": "ISO 8601 datetime"
  }
}
```

### 3. Contact API (Future)

#### POST `/api/contact`
**Description**: Send contact message  
**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

## External API Integrations

### LinkedIn Integration
**Purpose**: Fetch real-time profile data  
**Endpoint**: LinkedIn API  
**Auth**: OAuth 2.0  
**Data Needed**:
- Profile summary
- Work experience
- Skills
- Recommendations

### YouTube Integration  
**Purpose**: Fetch latest videos and stats  
**Endpoint**: YouTube Data API v3  
**Auth**: API Key  
**Data Needed**:
- Channel info
- Latest uploads
- View counts
- Subscriber count

## Frontend Data Consumption

### Current Mock Data Location
`/app/frontend/src/mock/portfolioData.js`

### Integration Points

#### 1. App Initialization
```javascript
// Future implementation
useEffect(() => {
  const fetchPortfolioData = async () => {
    const response = await fetch(`${BACKEND_URL}/api/portfolio`);
    const data = await response.json();
    // Replace mock data
  };
  fetchPortfolioData();
}, []);
```

#### 2. Zone Components
```javascript
// WelcomeZone.jsx, ProjectsZone.jsx, ConnectZone.jsx
// Currently: import portfolioData from '../../mock/portfolioData';
// Future: Use data from API context/state
```

#### 3. Interactive Objects
```javascript
// InteractiveObject.jsx
// Currently: Receives data as props from zone components
// Future: Same pattern, data will come from API
```

## State Management Migration

### Current (Zustand + Mock)
```javascript
// Local state only, no persistence
const { playerPosition, currentZone } = useGameStore();
```

### Future (Zustand + API)
```javascript
// Add API data slice
const usePortfolioStore = create((set) => ({
  portfolioData: null,
  loading: false,
  error: null,
  fetchPortfolio: async () => {
    set({ loading: true });
    try {
      const data = await fetchPortfolioAPI();
      set({ portfolioData: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  }
}));
```

## Database Schema (MongoDB)

### Collections

#### `portfolios`
```javascript
{
  _id: ObjectId,
  personal: {
    name: String,
    title: String,
    tagline: String,
    bio: String,
    avatar: String,
    socialLinks: {
      linkedIn: String,
      youtube: String,
      email: String
    }
  },
  skills: [{
    name: String,
    level: Number,
    category: String
  }],
  projects: [{
    id: Number,
    title: String,
    description: String,
    technologies: [String],
    image: String,
    link: String,
    featured: Boolean,
    createdAt: Date
  }],
  achievements: [{
    title: String,
    description: String,
    icon: String
  }],
  updatedAt: Date,
  createdAt: Date
}
```

#### `analytics` (Optional)
```javascript
{
  _id: ObjectId,
  eventType: String,
  data: Object,
  timestamp: Date,
  sessionId: String,
  userAgent: String
}
```

## File Upload (Future - Phase 3)

### Project Images
**Endpoint**: POST `/api/upload/project-image`  
**Storage**: AWS S3 / Cloudinary  
**Max Size**: 5MB  
**Formats**: PNG, JPG, WebP  

### Avatar
**Endpoint**: POST `/api/upload/avatar`  
**Storage**: AWS S3 / Cloudinary  
**Max Size**: 2MB  
**Formats**: PNG, JPG  

## Environment Variables

### Frontend (.env)
```bash
REACT_APP_BACKEND_URL=<configured>
REACT_APP_YOUTUBE_API_KEY=<future>
REACT_APP_LINKEDIN_CLIENT_ID=<future>
REACT_APP_ANALYTICS_ID=<future>
```

### Backend (.env)
```bash
MONGO_URL=<configured>
DB_NAME=<configured>
JWT_SECRET=<future>
AWS_ACCESS_KEY_ID=<future>
AWS_SECRET_ACCESS_KEY=<future>
YOUTUBE_API_KEY=<future>
LINKEDIN_CLIENT_SECRET=<future>
```

## Migration Path

### Phase 1 (Current)
✅ Frontend with mock data  
✅ All UI/UX working  
✅ No backend needed  

### Phase 2 (Backend Foundation)
- [ ] Create FastAPI endpoints
- [ ] Setup MongoDB models
- [ ] Implement CRUD for portfolio data
- [ ] Test with Postman/curl

### Phase 3 (Integration)
- [ ] Replace mock data with API calls
- [ ] Add loading states
- [ ] Error handling
- [ ] Data caching

### Phase 4 (External APIs)
- [ ] LinkedIn integration
- [ ] YouTube integration
- [ ] Analytics setup

### Phase 5 (Admin Panel - Optional)
- [ ] Create admin routes
- [ ] Build admin UI
- [ ] Implement authentication
- [ ] Add content management

## Testing Checklist

### Frontend Tests
- [ ] Component renders with mock data
- [ ] Component renders with API data
- [ ] Loading states work correctly
- [ ] Error states display properly
- [ ] Interactions work with real data

### Backend Tests
- [ ] GET /api/portfolio returns 200
- [ ] POST endpoints validate data
- [ ] Database operations succeed
- [ ] Error responses are correct
- [ ] API rate limiting works

### Integration Tests
- [ ] Full data flow: DB → API → Frontend
- [ ] Real-time updates work
- [ ] File uploads complete successfully
- [ ] External API calls succeed

## Notes

1. **No Breaking Changes**: The current mock data structure is designed to match the future API response exactly

2. **Backwards Compatible**: Frontend can work with or without backend by checking for API availability

3. **Progressive Enhancement**: Can add backend features incrementally without disrupting frontend

4. **Data Validation**: Both frontend and backend should validate data structure

5. **Caching Strategy**: Consider implementing caching to reduce API calls and improve performance

---

**Last Updated**: Phase 1 MVP Completion  
**Status**: Contracts defined, implementation pending
