# Shared DB

Shared database configuration and entities for the AI Video Maker application.

## Installation

```bash
npm install
```

## Usage

This package provides TypeORM entities and database configuration that can be shared across multiple applications.

```typescript
import { AppDataSource } from 'shared-db';
import { User, Video, Chapter } from 'shared-db/entities';
```

## Entities

- User
- Video
- Chapter
- Profile
- Settings
- ApiKey
- BackgroundAudio
- Channel
- File
- Process
- ProcessEstimate
- PerformanceMetrics
- Usage

## Migrations

Run migrations with:

```bash
npm run migrate
```

