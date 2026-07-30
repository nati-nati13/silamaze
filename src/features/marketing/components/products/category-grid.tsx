import {
  Droplet,
  Eye,
  FlaskConical,
  Pipette,
  Sun,
  SprayCan,
  Waves,
  type LucideIcon,
} from 'lucide-react';

import { Card, CardContent } from '@/shared/components/ui/card';
import { IconBadge } from '@/shared/components/ui/icon-badge';
import { PRODUCT_CATEGORIES, type ProductCategory } from '@/shared/const/product-categories.const';

const ICON_MAP: Record<ProductCategory['icon'], LucideIcon> = {
  droplet: Droplet,
  pipette: Pipette,
  eye: Eye,
  'spray-can': SprayCan,
  waves: Waves,
  sun: Sun,
  'flask-conical': FlaskConical,
};

export const ProductCategoryGrid = () => {
  return (
    <section className="bg-card py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            ამოირჩიე მოვლის კატეგორიები
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {PRODUCT_CATEGORIES.map((category) => {
            const Icon = ICON_MAP[category.icon];
            return (
              <Card key={category.id}>
                <CardContent className="flex flex-col items-center gap-3 text-center">
                  <IconBadge size="md">
                    <Icon aria-hidden="true" />
                  </IconBadge>
                  <p className="text-sm font-semibold text-foreground">{category.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
