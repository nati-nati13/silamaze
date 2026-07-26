import { SPACING_TOKENS } from '@/shared/const/design-system.const';

export const SpacingShowcase = () => {
  return (
    <div className="flex flex-col gap-3">
      {SPACING_TOKENS.map((token) => (
        <div key={token.name} className="flex items-center gap-4">
          <span className="w-8 shrink-0 font-mono text-xs text-muted-foreground">{token.name}</span>
          <div className={`h-4 rounded-sm bg-brand-academy ${token.className}`} />
        </div>
      ))}
    </div>
  );
};
