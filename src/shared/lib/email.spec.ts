import { describe, expect, it } from 'vitest';

import { EmailService, email } from '@/shared/lib/email';

describe('EmailService', () => {
  it('reports dev mode (not a real delivery) when no provider is configured', async () => {
    const res = await email.send({ to: 'a@b.com', subject: 'hi', html: '<p>hi</p>' });
    expect(res.ok).toBe(true);
    expect(res.mode).toBe('dev');
  });

  it('fails when the recipient address is missing or invalid', async () => {
    const svc = new EmailService();
    const res = await svc.send({ to: '', subject: 'x', html: 'x' });
    expect(res.ok).toBe(false);
    expect(res.error).toBe('MISSING_RECIPIENT');
  });
});
