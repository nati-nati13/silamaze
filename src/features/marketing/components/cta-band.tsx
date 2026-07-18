import { CallbackForm } from '@/features/callback/components/callback-form';

export const CtaBand = () => {
  return (
    <section id="slide-cta" className="relative bg-background py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:py-20">
          <h2 className="relative mx-auto max-w-xl font-heading text-3xl font-semibold leading-tight text-primary-foreground sm:text-4xl">
            ჩაეწერე კურსზე ან დაჯავშნე ვიზიტი
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-base leading-relaxed text-primary-foreground/75">
            დაგვიტოვე ნომერი — დაგირეკავთ და დაგეხმარებით სწორი კურსის ან
            პროცედურის არჩევაში.
          </p>
          <CallbackForm />
        </div>
      </div>
    </section>
  );
};
