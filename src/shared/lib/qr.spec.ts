import { describe, expect, it } from 'vitest';

import { qrCode } from '@/shared/lib/qr';

describe('QrCodeGenerator', () => {
  it('encodes a URL into a PNG data-URI', async () => {
    const url = 'https://example.com/gift-card/verify/abc123';
    const dataUrl = await qrCode.toDataUrl(url);
    expect(dataUrl.startsWith('data:image/png;base64,')).toBe(true);
    expect(dataUrl.length).toBeGreaterThan(100);
  });
});
