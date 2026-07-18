import { randomBytes } from 'node:crypto';

/**
 * Server-only generator for public gift-card codes.
 * Format: DRM-GC-XXXX-YYYY (two secure random uppercase-alphanumeric segments).
 * The alphabet omits ambiguous characters (0/O, 1/I) to keep codes readable.
 */
class GiftCardCodeGenerator {
  private readonly prefix = 'DRM-GC';
  private readonly alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  private readonly segmentLength = 4;

  private segment(): string {
    const bytes = randomBytes(this.segmentLength);
    let out = '';
    for (let i = 0; i < this.segmentLength; i++) {
      out += this.alphabet[bytes[i] % this.alphabet.length];
    }
    return out;
  }

  generate(): string {
    return `${this.prefix}-${this.segment()}-${this.segment()}`;
  }
}

export const giftCardCode = new GiftCardCodeGenerator();
export { GiftCardCodeGenerator };
