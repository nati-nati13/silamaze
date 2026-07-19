import { createHash, randomBytes } from 'node:crypto';

/**
 * High-entropy public verification tokens for gift-card QR codes.
 * The raw token is embedded in the QR / verification URL and handed to the
 * recipient; only its SHA-256 hash is persisted, so a leaked database never
 * exposes usable tokens and the URL never contains the Mongo document id.
 */
class VerificationTokenManager {
  private readonly byteLength = 32;

  generate(): string {
    return randomBytes(this.byteLength).toString('base64url');
  }

  hash(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}

export const verificationToken = new VerificationTokenManager();
export { VerificationTokenManager };
