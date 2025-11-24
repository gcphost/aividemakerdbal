import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

/**
 * Configuration options for secure crypto operations
 */
export interface SecureCryptoConfig {
  /** Encryption key as hex string. Defaults to API_KEY_ENCRYPTION_KEY env var */
  key?: string;
  /** Key length in bytes (default: 32 for AES-256) */
  keyLength?: number;
  /** Algorithm to use (default: aes-256-gcm) */
  algorithm?: string;
}

/**
 * Get default configuration for API key encryption
 */
function getDefaultConfig(): Required<SecureCryptoConfig> {
  const key = process.env.API_KEY_ENCRYPTION_KEY || '';
  if (!key) {
    console.warn('[secure-crypto] API_KEY_ENCRYPTION_KEY is not set!');
  }
  return {
    key,
    keyLength: 32,
    algorithm: 'aes-256-gcm'
  };
}

/**
 * Encrypts a string value using AES-256-GCM
 *
 * @param value - The plaintext value to encrypt
 * @param config - Optional configuration override
 * @returns Base64-encoded encrypted string in format: iv:encrypted:authTag
 * @throws Error if encryption key is not configured or invalid
 */
export function encrypt(value: string, config: SecureCryptoConfig = {}): string {
  const finalConfig = { ...getDefaultConfig(), ...config };

  if (!finalConfig.key) {
    throw new Error('Encryption key not configured. Set API_KEY_ENCRYPTION_KEY environment variable or provide key in config.');
  }

  if (Buffer.from(finalConfig.key, 'hex').length !== finalConfig.keyLength) {
    throw new Error(`Encryption key must be ${finalConfig.keyLength * 2} hex characters (${finalConfig.keyLength} bytes)`);
  }

  const key = Buffer.from(finalConfig.key, 'hex');
  const iv = randomBytes(16); // AES block size
  const cipher = createCipheriv(finalConfig.algorithm, key, iv);

  let encrypted = cipher.update(value, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  // For GCM mode, get the authentication tag
  const authTag = (cipher as any).getAuthTag();

  // Return in format: iv:encrypted:authTag (all base64)
  return `${iv.toString('base64')}:${encrypted}:${authTag.toString('base64')}`;
}

/**
 * Decrypts a string value encrypted with the encrypt function
 *
 * @param encryptedValue - The encrypted value in format: iv:encrypted:authTag
 * @param config - Optional configuration override
 * @returns The decrypted plaintext string
 * @throws Error if decryption fails or key is invalid
 */
export function decrypt(encryptedValue: string, config: SecureCryptoConfig = {}): string {
  const finalConfig = { ...getDefaultConfig(), ...config };

  if (!finalConfig.key) {
    console.error('[secure-crypto.decrypt] Encryption key not configured!');
    throw new Error('Encryption key not configured. Set API_KEY_ENCRYPTION_KEY environment variable or provide key in config.');
  }

  try {
    if (Buffer.from(finalConfig.key, 'hex').length !== finalConfig.keyLength) {
      throw new Error(`Encryption key must be ${finalConfig.keyLength * 2} hex characters (${finalConfig.keyLength} bytes)`);
    }
  } catch (e: any) {
    console.error('[secure-crypto.decrypt] Invalid key format:', e.message);
    throw e;
  }

  const key = Buffer.from(finalConfig.key, 'hex');

  // Parse the encrypted value format: iv:encrypted:authTag
  const parts = encryptedValue.split(':');
  if (parts.length !== 3) {
    console.error('[secure-crypto.decrypt] Invalid format: expected 3 parts, got', parts.length);
    throw new Error('Invalid encrypted value format. Expected iv:encrypted:authTag');
  }

  const [ivBase64, encryptedBase64, authTagBase64] = parts;

  try {
    const iv = Buffer.from(ivBase64, 'base64');
    const authTag = Buffer.from(authTagBase64, 'base64');

    const decipher = createDecipheriv(finalConfig.algorithm, key, iv);
    (decipher as any).setAuthTag(authTag);

    let decrypted = decipher.update(encryptedBase64, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    console.log('[secure-crypto.decrypt] Successfully decrypted value, length:', decrypted.length);
    return decrypted;
  } catch (error: any) {
    console.error('[secure-crypto.decrypt] Decryption failed:', error.message);
    throw new Error(`Decryption failed: ${error.message}`);
  }
}

/**
 * Validates that a value can be encrypted and decrypted successfully
 *
 * @param value - The value to test
 * @param config - Optional configuration override
 * @returns true if encryption/decryption roundtrip succeeds
 */
export function validateCrypto(value: string, config: SecureCryptoConfig = {}): boolean {
  try {
    const encrypted = encrypt(value, config);
    const decrypted = decrypt(encrypted, config);
    return decrypted === value;
  } catch {
    return false;
  }
}
