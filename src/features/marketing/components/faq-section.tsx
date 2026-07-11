import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { FAQ_ITEMS } from '@/shared/const/faq.const';

export const FaqSection = () => {
  return (
    <section id="slide-faq" className="relative bg-card py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-academy">FAQ</p>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            ხშირად დასმული <span className="italic text-brand-green">კითხვები</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            ვერ იპოვე პასუხი? დაგვირეკე ან დატოვე ნომერი ჯავშნის ფორმაში.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {FAQ_ITEMS.map((item) => (
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
