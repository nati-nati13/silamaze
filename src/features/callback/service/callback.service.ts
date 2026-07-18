import { callbackRepository } from '@/features/callback/repository/callback.repository';
import { PublicCallbackType } from '@/features/callback/validations/callback.validation';
import { CALLBACK_SOURCE_HOMEPAGE } from '@/shared/const/callback.const';
import { ServiceResult } from '@/shared/types/common';

const DUPLICATE_WINDOW_MS = 30_000;

const SUCCESS_MESSAGE = 'მადლობა! თქვენი ნომერი მივიღეთ და მალე დაგიკავშირდებით.';

export async function createCallbackService(
  input: PublicCallbackType
): Promise<ServiceResult<{ success: boolean; message: string }>> {
  const name = (input.name ?? '').trim();
  const phone = input.phone.trim();
  const message = (input.message ?? '').trim();

  // duplicate protection: skip inserting the same phone from the same source
  // within a short window (guards against double clicks / rapid resubmits)
  const since = new Date(Date.now() - DUPLICATE_WINDOW_MS);
  const recent = await callbackRepository.findRecent(phone, CALLBACK_SOURCE_HOMEPAGE, since);

  if (!recent) {
    // status + source are authoritative and server-set only
    await callbackRepository.create({
      name,
      phone,
      interestType: input.interestType,
      message,
      source: CALLBACK_SOURCE_HOMEPAGE,
      status: 'new',
    });

    console.warn('[ADMIN] ახალი callback მოთხოვნა', {
      name,
      phone,
      interestType: input.interestType,
      message,
      source: CALLBACK_SOURCE_HOMEPAGE,
      submittedAt: new Date().toISOString(),
    });
  }

  return { data: { success: true, message: SUCCESS_MESSAGE }, status: 201 };
}
