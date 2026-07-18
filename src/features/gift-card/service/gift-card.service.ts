import { giftCardRepository } from '@/features/gift-card/repository/gift-card.repository';
import { PublicGiftCardType } from '@/features/gift-card/validations/gift-card.validation';
import { ServiceResult } from '@/shared/types/common';

export async function createPublicGiftCardService(
  input: PublicGiftCardType
): Promise<ServiceResult<{ message: string }>> {
  await giftCardRepository.create({ userId: '', ...input });
  return { data: { message: 'Gift card order created' }, status: 201 };
}
