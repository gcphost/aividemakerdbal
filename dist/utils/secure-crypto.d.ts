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
 * Encrypts a string value using AES-256-GCM
 *
 * @param value - The plaintext value to encrypt
 * @param config - Optional configuration override
 * @returns Base64-encoded encrypted string in format: iv:encrypted:authTag
 * @throws Error if encryption key is not configured or invalid
 */
export declare function encrypt(value: string, config?: SecureCryptoConfig): string;
/**
 * Decrypts a string value encrypted with the encrypt function
 *
 * @param encryptedValue - The encrypted value in format: iv:encrypted:authTag
 * @param config - Optional configuration override
 * @returns The decrypted plaintext string
 * @throws Error if decryption fails or key is invalid
 */
export declare function decrypt(encryptedValue: string, config?: SecureCryptoConfig): string;
/**
 * Validates that a value can be encrypted and decrypted successfully
 *
 * @param value - The value to test
 * @param config - Optional configuration override
 * @returns true if encryption/decryption roundtrip succeeds
 */
export declare function validateCrypto(value: string, config?: SecureCryptoConfig): boolean;
//# sourceMappingURL=secure-crypto.d.ts.map