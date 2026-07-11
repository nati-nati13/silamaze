'use client';

import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import type { GalleryItem } from '@/shared/const/gallery.const';

type GalleryTileProps = {
  item: GalleryItem;
  heightClass: string;
};

export const GalleryTile = ({ item, heightClass }: GalleryTileProps) => {
  const [failed, setFailed] = useState(false);
  const showImage = item.src && !failed;

  return (
    <figure
      className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card ${heightClass}`}
    >
      {showImage ? (
        <Image
          src={item.src ?? ''}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-3 bg-brand-green/5 p-4 text-center">
          <ImageIcon className="size-8 text-brand-green/30" aria-hidden="true" />
          <p className="text-xs leading-snug text-muted-foreground">{item.alt}</p>
        </div>
      )}

      <figcaption
        className="absolute inset-x-0 bottom-0 translate-y-full bg-primary/80 p-3 text-xs font-semibold
          text-primary-foreground backdrop-blur-sm transition-transform duration-300
          group-hover:translate-y-0"
      >
        {item.alt}
        <span className="mt-0.5 block text-primary-foreground/60 uppercase tracking-widest">
          {item.category}
        </span>
      </figcaption>
    </figure>
  );
};
