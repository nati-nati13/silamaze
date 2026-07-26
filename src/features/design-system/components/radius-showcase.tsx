import { RADIUS_TOKENS } from '@/shared/const/design-system.const';

export const RadiusShowcase = () => {
  return (
    <div className="flex flex-wrap gap-8">
      {RADIUS_TOKENS.map((token) => (
        <div key={token.name} className="flex flex-col items-center gap-3">
          <div className={`size-20 border-2 border-primary bg-accent ${token.className}`} />
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{token.name}</p>
        </div>
      ))}
    </div>
  );
};
