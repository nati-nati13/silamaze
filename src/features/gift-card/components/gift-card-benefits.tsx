import { Crown, Gift, Leaf, Sparkles, type LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/shared/components/ui/card';
import { IconBadge } from '@/shared/components/ui/icon-badge';
import { GIFT_CARD_BENEFITS, type GiftCardBenefit } from '@/shared/const/gift-card.const';

const ICON_MAP: Record<GiftCardBenefit['icon'], LucideIcon> = {
  gift: Gift,
  sparkles: Sparkles,
  leaf: Leaf,
  crown: Crown,
};

export const GiftCardBenefits = () => {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            რატომ სასაჩუქრე სერტიფიკატი?
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {GIFT_CARD_BENEFITS.map((benefit) => {
            const Icon = ICON_MAP[benefit.icon];
            return (
              <Card key={benefit.title}>
                <CardContent className="flex flex-col items-center gap-3 text-center">
                  <IconBadge size="md">
                    <Icon aria-hidden="true" />
                  </IconBadge>
                  <p className="font-heading text-base font-semibold text-foreground">{benefit.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
