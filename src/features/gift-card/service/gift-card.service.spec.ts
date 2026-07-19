import { beforeEach, describe, expect, it, vi } from 'vitest';

import { giftCardRepository } from '@/features/gift-card/repository/gift-card.repository';
import {
  activateGiftCardService,
  verifyGiftCardByToken,
} from '@/features/gift-card/service/gift-card.service';

vi.mock('@/features/gift-card/repository/gift-card.repository', () => ({
  giftCardRepository: {
    findByCode: vi.fn(),
    findByVerificationTokenHash: vi.fn(),
    updateById: vi.fn(),
  },
}));

const repo = giftCardRepository as unknown as {
  findByCode: ReturnType<typeof vi.fn>;
  findByVerificationTokenHash: ReturnType<typeof vi.fn>;
  updateById: ReturnType<typeof vi.fn>;
};

const baseDoc = {
  _id: { toString: () => 'id1' },
  code: 'DRM-GC-AAAA-BBBB',
  status: 'pending',
  delivery: 'ელექტრონული',
  recipientEmail: 'r@gmail.com',
  recipientName: 'ლუკა',
  usage: 'ორივე',
  amount: '250 ₾',
  message: 'გილოცავ',
  isAnonymous: false,
  displayFrom: 'მეგობრები',
  deliveredAt: null,
  recipientDeliveryStatus: 'pending',
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('activateGiftCardService', () => {
  it('activates a pending card: sets issuedAt/expiresAt/token and delivers', async () => {
    repo.findByCode.mockResolvedValue({ ...baseDoc });
    const res = await activateGiftCardService('DRM-GC-AAAA-BBBB');
    expect(res.status).toBe(200);

    const activation = repo.updateById.mock.calls[0][1];
    expect(activation.status).toBe('active');
    expect(activation.issuedAt).toBeInstanceOf(Date);
    expect(activation.expiresAt).toBeInstanceOf(Date);
    // 12 months later
    const months =
      (activation.expiresAt.getFullYear() - activation.issuedAt.getFullYear()) * 12 +
      (activation.expiresAt.getMonth() - activation.issuedAt.getMonth());
    expect(months).toBe(12);
    expect(activation.verificationTokenHash).toMatch(/^[a-f0-9]{64}$/);

    const delivery = repo.updateById.mock.calls[1][1];
    expect(delivery.deliveredAt).toBeInstanceOf(Date);
    expect(delivery.recipientDeliveryStatus).toBe('sent');
  });

  it('rejects activation of an already-active card (no resend)', async () => {
    repo.findByCode.mockResolvedValue({ ...baseDoc, status: 'active' });
    const res = await activateGiftCardService('DRM-GC-AAAA-BBBB');
    expect(res.status).toBe(409);
    expect(repo.updateById).not.toHaveBeenCalled();
  });

  it('does not resend when the card was already delivered', async () => {
    repo.findByCode.mockResolvedValue({ ...baseDoc, deliveredAt: new Date() });
    await activateGiftCardService('DRM-GC-AAAA-BBBB');
    // activation update runs, but no delivery update (only 1 update call)
    expect(repo.updateById).toHaveBeenCalledTimes(1);
  });

  it('returns 404 for an unknown code', async () => {
    repo.findByCode.mockResolvedValue(null);
    const res = await activateGiftCardService('nope');
    expect(res.status).toBe(404);
  });
});

describe('verifyGiftCardByToken', () => {
  it('returns only safe fields and hides buyer identity when anonymous', async () => {
    repo.findByVerificationTokenHash.mockResolvedValue({
      code: 'DRM-GC-AAAA-BBBB',
      status: 'active',
      amount: '250 ₾',
      originalAmount: 250,
      remainingBalance: 250,
      currency: 'GEL',
      usage: 'ორივე',
      issuedAt: new Date('2026-01-01'),
      expiresAt: new Date('2027-01-01'),
      isAnonymous: true,
      displayFrom: 'გიორგი ბერიძე',
      buyerFirstName: 'გიორგი',
      buyerEmail: 'buyer@gmail.com',
      buyerPhone: '+995599000000',
    });
    const res = await verifyGiftCardByToken('sometoken');
    expect(res.found).toBe(true);
    expect(res.displayFrom).toBe('');
    expect(JSON.stringify(res)).not.toContain('buyer@gmail.com');
    expect(JSON.stringify(res)).not.toContain('+995599000000');
    expect(JSON.stringify(res)).not.toContain('გიორგი');
  });
});
