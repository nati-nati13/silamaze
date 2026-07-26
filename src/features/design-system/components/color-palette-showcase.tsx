import { COLOR_TOKENS } from '@/shared/const/design-system.const';

export const ColorPaletteShowcase = () => {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {COLOR_TOKENS.map((token) => (
        <div key={token.variable} className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className={`flex h-24 items-end p-3 ${token.swatchClassName}`}>
            <span className={`text-xs font-semibold uppercase tracking-widest ${token.textClassName}`}>Aa</span>
          </div>
          <div className="p-3">
            <p className="text-sm font-semibold text-foreground">{token.name}</p>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">{token.variable}</p>
            {token.hex ? <p className="font-mono text-xs text-muted-foreground">{token.hex}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
};
