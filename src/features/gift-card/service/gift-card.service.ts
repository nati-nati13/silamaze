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

export async function createPublicGiftCardService(
  input: PublicGiftCardType
): Promise<ServiceResult<GiftCardCreateResult>> {
  const monetaryValue = parseMonetaryAmount(input.amount);

  // authoritative, server-set values only — client cannot influence these
  const created = await giftCardRepository.create({
    userId: '',
    ...input,
    status: 'pending',
    originalAmount: monetaryValue,
    remainingBalance: monetaryValue,
    currency: monetaryValue !== null ? 'GEL' : null,
  });

  // email is persisted for the admin follow-up and future automated
  // customer email delivery of the digital card
  console.warn('[ADMIN] ახალი სასაჩუქრე ბარათის შეკვეთა', {
    code: created.code,
    status: created.status,
    name: input.name,
    phone: input.phone,
    email: input.email ?? '',
    recipient: input.recipient ?? '',
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
