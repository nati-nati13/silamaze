import { ArrowRight } from 'lucide-react';

import { GIFT_CARD_HOW_TO_STEPS } from '@/shared/const/gift-card.const';

export const GiftCardHowTo = () => {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            როგორ მივიღოთ?
          </h2>
        </div>

        <div className="mt-12 flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          {GIFT_CARD_HOW_TO_STEPS.flatMap((item, index) => {
            const stepEl = (
              <div
                key={`step-${item.step}`}
                className="flex flex-col items-center text-center sm:flex-1"
              >
                <span
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary
                    font-heading text-lg font-bold text-primary-foreground"
                >
                  {item.step}
                </span>
                <p className="mt-4 font-heading text-lg font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            );

            if (index === GIFT_CARD_HOW_TO_STEPS.length - 1) return [stepEl];

            const arrowEl = (
              <ArrowRight
                key={`arrow-${item.step}`}
                className="hidden size-6 shrink-0 text-border sm:mt-4 sm:block"
                aria-hidden="true"
              />
            );

            return [stepEl, arrowEl];
          })}
        </div>
      </div>
    </section>
  );
};
