import { Check, Gift } from 'lucide-react';

import { GIFT_CARD_USAGE_RULES } from '@/shared/const/gift-card.const';

export const GiftCardRulesBanner = () => {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">
              გამოყენების წესები
            </h2>
            <ul className="mt-8 flex flex-col gap-4">
              {GIFT_CARD_USAGE_RULES.map((rule) => (
                <li key={rule} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand-academy" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-primary-foreground/90 sm:text-base">
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden justify-self-center lg:flex">
            <Gift
              className="size-40 text-primary-foreground/15"
              strokeWidth={1}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
