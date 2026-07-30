import { Award, ShieldCheck, UserCheck, type LucideIcon } from 'lucide-react';

import { IconBadge } from '@/shared/components/ui/icon-badge';
import { PRODUCT_TRUST_BADGES, type ProductTrustBadge } from '@/shared/const/products-page.const';

const ICON_MAP: Record<ProductTrustBadge['icon'], LucideIcon> = {
  'shield-check': ShieldCheck,
  'user-check': UserCheck,
  award: Award,
};

export const ProductTrustBadges = () => {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PRODUCT_TRUST_BADGES.map((badge) => {
            const Icon = ICON_MAP[badge.icon];
            return (
              <div key={badge.title} className="flex flex-col items-center gap-3 text-center">
                <IconBadge size="md">
                  <Icon aria-hidden="true" />
                </IconBadge>
                <p className="font-heading text-lg font-semibold text-foreground">{badge.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
