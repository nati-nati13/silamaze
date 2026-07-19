import { describe, expect, it } from 'vitest';

import { VerificationTokenManager, verificationToken } from '@/shared/lib/verification-token';

describe('VerificationTokenManager', () => {
  it('generates url-safe high-entropy tokens', () => {
    const token = verificationToken.generate();
    expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(token.length).toBeGreaterThanOrEqual(40);
  });

  it('produces unique tokens across calls', () => {
    const gen = new VerificationTokenManager();
    const tokens = new Set(Array.from({ length: 500 }, () => gen.generate()));
    expect(tokens.size).toBe(500);
  });

  it('hashes deterministically and differs from the raw token', () => {
    const token = verificationToken.generate();
    const hash = verificationToken.hash(token);
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
    expect(hash).not.toBe(token);
    expect(verificationToken.hash(token)).toBe(hash);
  });
});
