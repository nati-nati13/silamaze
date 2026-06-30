import { DERMAKO_STATS } from '@/shared/const/home.const';

export const StatStrip = () => {
  return (
    <section
      id="slide-stats"
      className="snap-always snap-start h-screen relative flex items-center overflow-hidden bg-card"
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="absolute -bottom-16 right-0 font-heading text-9xl font-black text-foreground leading-none tracking-tighter">
          10+
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              ჩვენი შედეგები
            </p>
            <h2 className="mt-4 font-heading text-5xl font-bold text-foreground sm:text-6xl">
              ნდობა <br />
              <span className="text-primary italic">ციფრებში</span>
            </h2>
            <div className="mt-6 h-px w-16 bg-primary/50" aria-hidden="true" />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
              10 წლის განმავლობაში ჩვენ მივაღწიეთ შედეგებს, რომლებიც
              საუბრობენ ჩვენს სახელად.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-10">
            {DERMAKO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="group border-l-2 border-primary/20 pl-6 transition-all duration-500 hover:border-primary"
              >
                <dt className="font-heading text-6xl font-black text-foreground sm:text-7xl">
                  {stat.value}
                </dt>
                <dd className="mt-3 text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
