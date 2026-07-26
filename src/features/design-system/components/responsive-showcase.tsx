const FRAMES = [
  { label: 'Mobile · < 640px', frameClassName: 'max-w-xs' },
  { label: 'Tablet · ~768px', frameClassName: 'max-w-md' },
  { label: 'Desktop · 1280px+', frameClassName: 'w-full' },
];

export const ResponsiveShowcase = () => {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm text-muted-foreground">
        Card grid reflowing by container width (via Tailwind container queries) — a stand-in for how the site's
        card grids behave across breakpoints. Header/nav breakpoints are viewport-based (see header preview above)
        and can't be simulated inside a fixed-width frame; resize the browser window to test those.
      </p>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {FRAMES.map((frame) => (
          <div key={frame.label} className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-academy">{frame.label}</p>
            <div className={`mx-auto rounded-2xl border border-border bg-muted p-4 ${frame.frameClassName}`}>
              <div className="@container">
                <div className="grid grid-cols-1 gap-3 @sm:grid-cols-2 @lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex aspect-square items-center justify-center rounded-xl border border-border bg-card text-xs text-muted-foreground"
                    >
                      Card {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
