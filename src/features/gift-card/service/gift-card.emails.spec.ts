import { describe, expect, it } from 'vitest';

import {
  buildBuyerConfirmationEmail,
  buildRecipientEmail,
} from '@/features/gift-card/service/gift-card.emails';

const base = {
  recipientName: 'ლუკა',
  amount: '250 ₾',
  message: 'გილოცავ დაბადების დღეს',
  location: 'ორივე ფილიალი',
  code: 'DRM-GC-XXXX-YYYY',
  validUntil: '2027-01-01',
  qrDataUrl: 'data:image/png;base64,AAA',
  verifyUrl: 'https://x/gift-card/verify/tok',
};

describe('gift-card emails', () => {
  it('anonymous recipient email hides the sender and message', () => {
    const { html } = buildRecipientEmail({
      ...base,
      isAnonymous: true,
      displayFrom: 'გიორგი ბერიძე',
    });
    expect(html).toContain('თქვენ მიიღეთ Dermako-ს სასაჩუქრე ბარათი.');
    expect(html).not.toContain('გამგზავნი:');
    expect(html).not.toContain('გიორგი ბერიძე');
  });

  it('non-anonymous recipient email shows displayFrom', () => {
    const { html } = buildRecipientEmail({
      ...base,
      isAnonymous: false,
      displayFrom: 'სიყვარულით, მეგობრებისგან',
    });
    expect(html).toContain('გამგზავნი:');
    expect(html).toContain('სიყვარულით, მეგობრებისგან');
  });

  it('buyer confirmation states the card is not yet active', () => {
    const { html } = buildBuyerConfirmationEmail({
      code: 'DRM-GC-1',
      amount: '250 ₾',
      recipientName: 'ლუკა',
      delivery: 'ელექტრონული',
      location: 'ორივე ფილიალი',
      status: 'pending',
    });
    expect(html).toContain('DRM-GC-1');
    expect(html).toContain('გააქტიურდება გადახდის');
  });
});
