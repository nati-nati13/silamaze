import type { Metadata } from 'next';

import { NewsPage } from '@/features/marketing/components/news-page';

export const metadata: Metadata = {
  title: 'სიახლეები — Dermako Academy',
  description: 'Dermako Academy-ის სიახლეები და განახლებები.',
};

export default function NewsPageRoute() {
  return <NewsPage />;
}
