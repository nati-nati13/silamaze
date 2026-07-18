import { giftCardRepository } from '@/features/gift-card/repository/gift-card.repository';
import { PublicGiftCardType } from '@/features/gift-card/validations/gift-card.validation';
import { ServiceResult } from '@/shared/types/common';

type GiftCardCreateResult = {
  success: boolean;
  giftCardCode: string;
  status: string;
  message: string;
};

// monetary amounts arrive as "250 ₾"; service/course cards carry a name and no ₾
function parseMonetaryAmount(amount: string): number | null {
  if (!amount.includes('₾')) return null;
  const match = amount.replace(/\s/g, '').match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

// resolve authoritative buyer identity from structured fields, falling back to
// the legacy single `name`/`phone`/`email` (reservation-form flow)
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
  const email = (input.buyerEmail || input.email || '').trim();

  return { firstName, lastName, fullName, phone, email };
}

export async function createPublicGiftCardService(
  input: PublicGiftCardType
): Promise<ServiceResult<GiftCardCreateResult>> {
  const monetaryValue = parseMonetaryAmount(input.amount);
  const buyer = resolveBuyer(input);
  const resolvedRecipient = (input.recipientName ?? '').trim();
  const displayFrom = (input.displayFrom ?? '').trim();

  // authoritative, server-set values only — client cannot influence these
  const created = await giftCardRepository.create({
    userId: '',
    amount: input.amount,
    usage: input.usage,
    delivery: input.delivery,
    address: input.address ?? '',
    // structured buyer + recipient/display
    buyerFirstName: buyer.firstName,
    buyerLastName: buyer.lastName,
    buyerPhone: buyer.phone,
    buyerEmail: buyer.email,
    recipientName: resolvedRecipient,
    recipientPhone: (input.recipientPhone ?? '').trim(),
    recipientEmail: (input.recipientEmail ?? '').trim(),
    displayFrom,
    // legacy dual-write for backward compatibility
    recipient: resolvedRecipient,
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

  // full buyer name/phone/email surfaced for admin follow-up, payments and refunds
  console.warn('[ADMIN] ახალი სასაჩუქრე ბარათის შეკვეთა', {
    code: created.code,
    status: created.status,
    buyerName: buyer.fullName,
    buyerPhone: buyer.phone,
    buyerEmail: buyer.email,
    recipient: resolvedRecipient,
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
