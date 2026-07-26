import { TYPE_SCALE_TOKENS } from '@/shared/const/design-system.const';

export const TypographyShowcase = () => {
  return (
    <div className="flex flex-col gap-6">
      {TYPE_SCALE_TOKENS.map((token) => (
        <div
          key={token.label}
          className="flex flex-col gap-2 border-b border-border pb-6 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between"
        >
          <p className={token.sampleClassName}>დერმაკო — სილამაზე &amp; აკადემია</p>
          <div className="shrink-0 text-right">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-academy">{token.label}</p>
            <p className="text-xs text-muted-foreground">{token.usage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
