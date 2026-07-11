import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { GalleryTile } from '@/features/marketing/components/gallery-tile';
import { Button } from '@/shared/components/ui/button';
import { GALLERY_ITEMS } from '@/shared/const/gallery.const';

const PREVIEW_COUNT = 6;
const HEIGHT_CYCLE = ['h-64', 'h-80', 'h-56', 'h-72', 'h-64', 'h-96'];

export const GalleryPreviewSection = () => {
  return (
    <section id="slide-gallery" className="relative bg-background py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-academy">გალერეა</p>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            ჩვენი <span className="italic text-brand-green">სივრცე</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            კლინიკა, სწავლების პროცესი და შედეგები — ერთი შეხედვით.
          </p>
        </div>

        <div className="mt-14 columns-2 gap-4 lg:columns-3">
          {GALLERY_ITEMS.slice(0, PREVIEW_COUNT).map((item, index) => (
            <GalleryTile
              key={item.id}
              item={item}
              heightClass={HEIGHT_CYCLE[index % HEIGHT_CYCLE.length]}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/galeria">
              სრული გალერეა
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
