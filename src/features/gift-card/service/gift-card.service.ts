import { giftCardRepository } from '@/features/gift-card/repository/gift-card.repository';
import { PublicGiftCardType } from '@/features/gift-card/validations/gift-card.validation';
import { ServiceResult } from '@/shared/types/common';

export async function createPublicGiftCardService(
  input: PublicGiftCardType
): Promise<ServiceResult<{ message: string }>> {
  const id = await giftCardRepository.create({ userId: '', ...input });
  // email is persisted for the admin follow-up and future automated
  // customer email delivery of the digital card
  console.warn('[ADMIN] ახალი სასაჩუქრე ბარათის შეკვეთა', {
    id,
    amount: input.amount,
    name: input.name,
    phone: input.phone,
    email: input.email ?? '',
    usage: input.usage,
    delivery: input.delivery,
  });
  return { data: { message: 'Gift card order created' }, status: 201 };
}
