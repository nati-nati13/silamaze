import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { GIFT_CARD_FAQ_ITEMS } from '@/shared/const/gift-card.const';

export const GiftCardFaq = () => {
  return (
    <section className="bg-card py-20 sm:py-28">
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-academy">FAQ</p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            ხშირად დასმული კითხვები
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {GIFT_CARD_FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-border">
              <AccordionTrigger className="font-heading text-base font-semibold text-foreground hover:no-underline hover:text-brand-green sm:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
