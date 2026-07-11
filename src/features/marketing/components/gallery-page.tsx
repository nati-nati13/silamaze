'use client';

import { useState } from 'react';

import { GalleryTile } from '@/features/marketing/components/gallery-tile';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategory,
} from '@/shared/const/gallery.const';

// varied tile heights create the masonry rhythm until real photos define their own
const HEIGHT_CYCLE = ['h-64', 'h-80', 'h-56', 'h-72', 'h-64', 'h-96'];

export const GalleryPage = () => {
  const [active, setActive] = useState<GalleryCategory>('ყველა');

  const filtered =
    active === 'ყველა' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === active);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              Dermako Academy
            </p>
            <h1 className="mt-3 font-heading text-5xl font-bold text-foreground sm:text-6xl">
              გალერეა
            </h1>
            <div className="mt-4 h-px w-16 bg-primary" aria-hidden="true" />
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="კატეგორია">
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                    active === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
              {filtered.map((item, index) => (
                <GalleryTile
                  key={item.id}
                  item={item}
                  heightClass={HEIGHT_CYCLE[index % HEIGHT_CYCLE.length]}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="py-24 text-center text-sm text-muted-foreground">
                ამ კატეგორიაში ფოტო არ არის.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
