import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';

export const HeaderFooterPreview = () => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Header — sticky, shared/components/layout/header.tsx
        </p>
        <div className="overflow-hidden rounded-2xl border border-border">
          <Header />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Nav collapses to a hamburger menu below the <span className="font-mono">xl</span> (1280px) breakpoint —
          resize the browser to see it. This is now the single header used across every public and protected page.
        </p>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Footer — shared/components/layout/footer.tsx
        </p>
        <div className="overflow-hidden rounded-2xl border border-border">
          <Footer />
        </div>
      </div>
    </div>
  );
};
