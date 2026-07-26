import { SHADOW_TOKENS } from '@/shared/const/design-system.const';

export const ShadowShowcase = () => {
  return (
    <div className="flex flex-wrap gap-10 rounded-2xl bg-muted p-8">
      {SHADOW_TOKENS.map((token) => (
        <div key={token.name} className="flex flex-col items-center gap-3">
          <div className={`size-20 rounded-2xl border border-border bg-card ${token.className}`} />
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            shadow-{token.name}
          </p>
        </div>
      ))}
    </div>
  );
};
