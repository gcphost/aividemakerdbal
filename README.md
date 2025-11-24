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

## Secret Encryption

Sensitive data like API keys and OAuth tokens are automatically encrypted at rest using AES-256-GCM. The encryption key is managed securely and shared across all applications.

### Environment Setup

Set the `API_KEY_ENCRYPTION_KEY` environment variable to a 64-character hex string (32 bytes). This key is generated automatically by the Electron app and stored securely.

### Migration

If upgrading from a version without encryption, run the migration script:

```bash
# From the app directory
cd app
npx tsx scripts/re-encrypt-secrets.ts
```

This script will:
- Encrypt any plaintext API keys and secrets
- Encrypt any plaintext OAuth tokens in channels
- Skip already-encrypted data (safe to run multiple times)

### Troubleshooting

If decryption fails (e.g., after key rotation):
1. The system will log helpful error messages
2. Users may need to re-enter API keys through the UI
3. Contact support if issues persist

## Migrations

Run migrations with:

```bash
npm run migrate
```

