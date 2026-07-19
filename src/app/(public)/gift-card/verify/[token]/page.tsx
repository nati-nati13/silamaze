
import { GiftCardVerifyPage } from '@/features/gift-card/components/gift-card-verify-page';
import { verifyGiftCardByToken } from '@/features/gift-card/service/gift-card.service';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ბარათის შემოწმება — Dermako Academy',
  robots: { index: false, follow: false },
};

export default async function GiftCardVerifyRoute({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const data = await verifyGiftCardByToken(token);
  return <GiftCardVerifyPage data={data} />;
}
