import { Hand, MoreHorizontal, Sparkles, Syringe, Zap, type LucideIcon } from 'lucide-react';

import {
  GIFT_CARD_PREVIEW_AMOUNTS,
  GIFT_CARD_SERVICE_PREVIEW_ITEMS,
  type GiftCardServicePreviewItem,
} from '@/shared/const/gift-card.const';

const ICON_MAP: Record<GiftCardServicePreviewItem['icon'], LucideIcon> = {
  laser: Zap,
  injection: Syringe,
  facial: Sparkles,
  massage: Hand,
  other: MoreHorizontal,
};

export const GiftCardSelectionPreview = () => {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            შეგიძლიათ აირჩიოთ
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              კონკრეტული მომსახურება
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              აირჩიეთ თქვენთვის სასურველი პროცედურა და მიუთითეთ სერტიფიკატზე.
            </p>

            <ul className="mt-6 flex flex-col gap-4">
              {GIFT_CARD_SERVICE_PREVIEW_ITEMS.map((item) => {
                const Icon = ICON_MAP[item.icon];
                return (
                  <li key={item.label} className="flex items-center gap-3">
                    <Icon className="size-5 shrink-0 text-brand-academy" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="font-heading text-xl font-semibold text-foreground">სასურველი თანხა</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              სასაჩუქრე სერტიფიკატი შეიძლება გაფორმდეს ნებისმიერ თანხაზე.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {GIFT_CARD_PREVIEW_AMOUNTS.map((amount) => (
                <span
                  key={amount}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground"
                >
                  {amount}
                </span>
              ))}
              <span className="rounded-full border border-dashed border-brand-academy px-4 py-2 text-sm font-semibold text-brand-academy">
                სხვა თანხა
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
