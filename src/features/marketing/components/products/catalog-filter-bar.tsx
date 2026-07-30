import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { EyebrowLabel } from '@/shared/components/ui/eyebrow-label';
import { Input } from '@/shared/components/ui/input';
import { NativeSelect } from '@/shared/components/ui/select';

const FILTER_LABELS = ['კატეგორია', 'ბრენდი', 'კანის ტიპი', 'კანის პრობლემა'];

export const ProductCatalogFilterBar = () => {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
            <Input disabled placeholder="პროდუქტის ძიება" className="sm:col-span-2" />
            {FILTER_LABELS.map((label) => (
              <NativeSelect key={label} disabled defaultValue="">
                <option value="" disabled>
                  {label}
                </option>
              </NativeSelect>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            {/* TODO: replace with real illustration */}
            <div className="aspect-4/3 rounded-2xl border border-border bg-muted" />

            <div>
              <EyebrowLabel>PRODUCT CATALOG</EyebrowLabel>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                პროდუქციის კატალოგი მალე დაემატება
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                პროფესიონალური მოვლის საშუალებების შერჩევისთვის დაგვიკავშირდით.
              </p>
              <Button
                size="lg"
                className="mt-8 bg-brand-academy text-primary hover:bg-brand-academy/90"
                asChild
              >
                <Link href="/kontakti">კონსულტაციის მიღება</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
