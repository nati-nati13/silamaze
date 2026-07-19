import { giftCardRepository } from '@/features/gift-card/repository/gift-card.repository';
import {
  buildBuyerConfirmationEmail,
  buildRecipientEmail,
} from '@/features/gift-card/service/gift-card.emails';
import { PublicGiftCardType } from '@/features/gift-card/validations/gift-card.validation';
import { GIFT_CARD_VALIDITY_MONTHS } from '@/shared/const/gift-card.const';
import { email } from '@/shared/lib/email';
import { qrCode } from '@/shared/lib/qr';
import { verificationToken } from '@/shared/lib/verification-token';
import { ServiceResult } from '@/shared/types/common';

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

type GiftCardCreateResult = {
  success: boolean;
  giftCardCode: string;
  status: string;
  message: string;
};

function parseMonetaryAmount(amount: string): number | null {
  if (!amount.includes('₾')) return null;
  const match = amount.replace(/\s/g, '').match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

function resolveBuyer(input: PublicGiftCardType) {
  let firstName = (input.buyerFirstName ?? '').trim();
  let lastName = (input.buyerLastName ?? '').trim();
  if (!firstName && !lastName && input.name) {
    const parts = input.name.trim().split(/\s+/);
    firstName = parts[0] ?? '';
    lastName = parts.slice(1).join(' ');
  }
  const fullName = `${firstName} ${lastName}`.trim() || (input.name ?? '').trim() || 'სტუმარი';
  const phone = (input.buyerPhone || input.phone || '').trim();
  const emailAddr = (input.buyerEmail || input.email || '').trim();
  return { firstName, lastName, fullName, phone, email: emailAddr };
}

const locationLabel = (usage: string): string => (usage === 'ორივე' ? 'ორივე ფილიალი' : usage);

export async function createPublicGiftCardService(
  input: PublicGiftCardType
): Promise<ServiceResult<GiftCardCreateResult>> {
  const monetaryValue = parseMonetaryAmount(input.amount);
  const buyer = resolveBuyer(input);
  const recipientName = (input.recipientName ?? '').trim();
  // digital delivery uses the recipient's own email; legacy single-email flow reuses it
  const recipientEmail = (input.recipientEmail || input.email || '').trim();
  const isAnonymous = input.isAnonymous === true;
  const displayFrom = isAnonymous ? '' : (input.displayFrom ?? '').trim();
  const deliveryDate =
    input.deliveryDate && input.deliveryDate.trim() ? new Date(input.deliveryDate) : null;

  const created = await giftCardRepository.create({
    userId: '',
    amount: input.amount,
    usage: input.usage,
    delivery: input.delivery,
    address: input.address ?? '',
    buyerFirstName: buyer.firstName,
    buyerLastName: buyer.lastName,
    buyerPhone: buyer.phone,
    buyerEmail: buyer.email,
    recipientName,
    recipientPhone: (input.recipientPhone ?? '').trim(),
    recipientEmail,
    displayFrom,
    isAnonymous,
    deliveryDate,
    recipientDeliveryStatus: deliveryDate ? 'scheduled' : 'pending',
    recipient: recipientName,
    sender: displayFrom,
    name: buyer.fullName,
    phone: buyer.phone,
    email: buyer.email,
    message: input.message ?? '',
    status: 'pending',
    originalAmount: monetaryValue,
    remainingBalance: monetaryValue,
    currency: monetaryValue !== null ? 'GEL' : null,
  });

  // buyer order confirmation (NOT the active gift card) — dev-preview until a provider is wired
  if (buyer.email) {
    const mail = buildBuyerConfirmationEmail({
      code: created.code,
      amount: input.amount,
      recipientName,
      delivery: input.delivery,
      location: locationLabel(input.usage),
      status: created.status,
    });
    await email.send({ to: buyer.email, subject: mail.subject, html: mail.html });
  }

  console.warn('[ADMIN] ახალი სასაჩუქრე ბარათის შეკვეთა', {
    code: created.code,
    status: created.status,
    buyerName: buyer.fullName,
    buyerPhone: buyer.phone,
    buyerEmail: buyer.email,
    recipientName,
    recipientEmail,
    isAnonymous,
    deliveryDate: deliveryDate ? deliveryDate.toISOString() : null,
    delivery: input.delivery,
    location: input.usage,
    amount: input.amount,
  });

  return {
    data: {
      success: true,
      giftCardCode: created.code,
      status: created.status,
      message: 'სასაჩუქრე ბარათის მოთხოვნა წარმატებით მივიღეთ.',
    },
    status: 201,
  };
}

// Admin-only: activate a paid gift card, then deliver the recipient email.
export async function activateGiftCardService(
  code: string
): Promise<ServiceResult<{ code: string; status: string; recipientDeliveryStatus: string }>> {
  const doc = await giftCardRepository.findByCode(code);
  if (!doc) return { data: { error: 'NOT_FOUND' }, status: 404 };
  if (doc.status !== 'pending' && doc.status !== 'awaiting_payment') {
    return { data: { error: 'NOT_ACTIVATABLE' }, status: 409 };
  }

  const issuedAt = new Date();
  const expiresAt = new Date(issuedAt);
  expiresAt.setMonth(expiresAt.getMonth() + GIFT_CARD_VALIDITY_MONTHS);
  const rawToken = verificationToken.generate();

  await giftCardRepository.updateById(doc._id.toString(), {
    status: 'active',
    issuedAt,
    expiresAt,
    verificationTokenHash: verificationToken.hash(rawToken),
    qrGeneratedAt: new Date(),
  });

  let recipientDeliveryStatus = doc.recipientDeliveryStatus;
  // avoid duplicate delivery
  if (!doc.deliveredAt && doc.delivery === 'ელექტრონული' && doc.recipientEmail) {
    const verifyUrl = `${BASE_URL}/gift-card/verify/${rawToken}`;
    const qrDataUrl = await qrCode.toDataUrl(verifyUrl);
    const mail = buildRecipientEmail({
      recipientName: doc.recipientName || doc.recipient || '',
      amount: doc.amount,
      message: doc.message || '',
      location: locationLabel(doc.usage),
      code: doc.code ?? '',
      validUntil: expiresAt.toLocaleDateString('ka-GE'),
      qrDataUrl,
      verifyUrl,
      isAnonymous: doc.isAnonymous === true,
      displayFrom: doc.displayFrom || '',
    });
    const result = await email.send({ to: doc.recipientEmail, subject: mail.subject, html: mail.html });
    if (result.ok) {
      recipientDeliveryStatus = 'sent';
      await giftCardRepository.updateById(doc._id.toString(), {
        deliveredAt: new Date(),
        recipientDeliveryStatus: 'sent',
        deliveryFailureReason: '',
      });
    } else {
      recipientDeliveryStatus = 'failed';
      await giftCardRepository.updateById(doc._id.toString(), {
        recipientDeliveryStatus: 'failed',
        deliveryFailureReason: result.error ?? 'SEND_FAILED',
      });
    }
  }

  return { data: { code: doc.code ?? '', status: 'active', recipientDeliveryStatus }, status: 200 };
}

export type SafeVerification = {
  found: boolean;
  code?: string;
  status?: string;
  amount?: string;
  originalAmount?: number | null;
  remainingBalance?: number | null;
  currency?: string | null;
  location?: string;
  issuedAt?: string | null;
  expiresAt?: string | null;
  displayFrom?: string;
};

// Public: resolve a scanned token to SAFE, non-PII gift-card data only.
export async function verifyGiftCardByToken(token: string): Promise<SafeVerification> {
  const doc = await giftCardRepository.findByVerificationTokenHash(verificationToken.hash(token));
  if (!doc) return { found: false };
  return {
    found: true,
    code: doc.code ?? '',
    status: doc.status,
    amount: doc.amount,
    originalAmount: doc.originalAmount ?? null,
    remainingBalance: doc.remainingBalance ?? null,
    currency: doc.currency ?? null,
    location: locationLabel(doc.usage),
    issuedAt: doc.issuedAt ? new Date(doc.issuedAt).toISOString() : null,
    expiresAt: doc.expiresAt ? new Date(doc.expiresAt).toISOString() : null,
    displayFrom: doc.isAnonymous ? '' : doc.displayFrom || '',
  };
}
