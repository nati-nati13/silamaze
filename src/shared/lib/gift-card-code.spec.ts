import { describe, expect, it } from 'vitest';

import { GiftCardCodeGenerator, giftCardCode } from '@/shared/lib/gift-card-code';

describe('GiftCardCodeGenerator', () => {
  it('generates codes in the DRM-GC-XXXX-YYYY format', () => {
    const code = giftCardCode.generate();
    expect(code).toMatch(/^DRM-GC-[A-Z2-9]{4}-[A-Z2-9]{4}$/);
  });

  it('excludes ambiguous characters (0, O, 1, I)', () => {
    const gen = new GiftCardCodeGenerator();
    for (let i = 0; i < 200; i++) {
      const segments = gen.generate().replace('DRM-GC-', '');
      expect(segments).not.toMatch(/[01OI]/);
    }
  });

  it('produces different codes across calls', () => {
    const gen = new GiftCardCodeGenerator();
    const codes = new Set(Array.from({ length: 500 }, () => gen.generate()));
    // collisions across 500 draws from a 32^8 space must be effectively impossible
    expect(codes.size).toBe(500);
  });
});
