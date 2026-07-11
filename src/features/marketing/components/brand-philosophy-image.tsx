'use client';

import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import {
  BRAND_PHILOSOPHY_IMAGE,
  BRAND_PHILOSOPHY_IMAGE_ALT,
} from '@/shared/const/offerings.const';

export const BrandPhilosophyImage = () => {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="relative mx-auto aspect-3/4 w-full max-w-md overflow-hidden rounded-3xl
        border border-border bg-card shadow-2xl lg:mx-0"
    >
      {failed ? (
        <div
          className="flex size-full flex-col items-center justify-center gap-3 bg-brand-green/5
            p-6 text-center"
        >
          <ImageIcon className="size-8 text-brand-green/30" aria-hidden="true" />
          <p className="text-xs leading-snug text-muted-foreground">
            {BRAND_PHILOSOPHY_IMAGE_ALT}
          </p>
        </div>
      ) : (
        <Image
          src={BRAND_PHILOSOPHY_IMAGE}
          alt={BRAND_PHILOSOPHY_IMAGE_ALT}
          fill
          sizes="(max-width: 1024px) 100vw, 28rem"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
};
