import { DERMAKO_STATS } from '@/shared/const/home.const';

export const StatStrip = () => {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {DERMAKO_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="font-heading text-5xl font-bold">{stat.value}</dt>
              <dd className="mt-1 text-xs font-semibold tracking-widest uppercase opacity-75">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
