import { Quote } from 'lucide-react';

import { TESTIMONIALS } from '@/shared/const/testimonials.const';

export const TestimonialsSection = () => {
  return (
    <section id="slide-testimonials" className="relative bg-background py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-academy">შეფასებები</p>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            რას ამბობენ <span className="italic text-brand-green">ჩვენზე</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            კურსდამთავრებულები და კლიენტები — მათი გამოცდილება საუბრობს ჩვენს
            ნაცვლად.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="group flex flex-col rounded-2xl border border-border bg-card p-8
                transition-all duration-300 hover:-translate-y-1 hover:border-brand-academy/50 sm:p-10"
            >
              <Quote
                className="size-8 -scale-x-100 text-brand-academy/40"
                aria-hidden="true"
              />
              <blockquote className="mt-6 flex-1">
                <p className="font-heading text-lg font-medium italic leading-relaxed text-foreground">
                  {testimonial.text}
                </p>
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-6">
                <p className="font-heading text-base font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{testimonial.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
