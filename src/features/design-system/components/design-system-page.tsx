import { APP_NAME } from '@/shared/const/app.const';

import { ButtonShowcase } from './button-showcase';
import { CardShowcase } from './card-showcase';
import { ColorPaletteShowcase } from './color-palette-showcase';
import { EyebrowShowcase } from './eyebrow-showcase';
import { FormShowcase } from './form-showcase';
import { HeaderFooterPreview } from './header-footer-preview';
import { IconBadgeShowcase } from './icon-badge-showcase';
import { RadiusShowcase } from './radius-showcase';
import { ResponsiveShowcase } from './responsive-showcase';
import { ShadowShowcase } from './shadow-showcase';
import { ShowcaseSection } from './showcase-section';
import { SpacingShowcase } from './spacing-showcase';
import { TypographyShowcase } from './typography-showcase';

export const DesignSystemPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-primary py-12 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-academy">Internal documentation</p>
          <h1 className="mt-3 font-heading text-4xl font-bold">{APP_NAME} — Design System</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/70">
            Living reference for tokens and shared components. Not linked from public navigation, footer, or
            sitemap — internal use only.
          </p>
        </div>
      </div>

      <ShowcaseSection eyebrow="დერმაკო" title="Color palette" description="Semantic tokens from globals.css.">
        <ColorPaletteShowcase />
      </ShowcaseSection>

      <ShowcaseSection eyebrow="სილამაზე & აკადემია" title="Typography scale" description="Playfair Display (headings) + Poppins (body/UI).">
        <TypographyShowcase />
      </ShowcaseSection>

      <ShowcaseSection eyebrow="ჩვენი სერვისები" title="Eyebrow labels">
        <EyebrowShowcase />
      </ShowcaseSection>

      <ShowcaseSection eyebrow="დაჯავშნა" title="Buttons" description="All variants, sizes, and states.">
        <ButtonShowcase />
      </ShowcaseSection>

      <ShowcaseSection eyebrow="დერმაკო" title="Icon badges">
        <IconBadgeShowcase />
      </ShowcaseSection>

      <ShowcaseSection eyebrow="სასაჩუქრე ბარათი" title="Cards" description="Image, feature, and content-only variants.">
        <CardShowcase />
      </ShowcaseSection>

      <ShowcaseSection eyebrow="ფორმები" title="Form controls">
        <FormShowcase />
      </ShowcaseSection>

      <ShowcaseSection eyebrow="Shape" title="Border radius">
        <RadiusShowcase />
      </ShowcaseSection>

      <ShowcaseSection eyebrow="Elevation" title="Shadows">
        <ShadowShowcase />
      </ShowcaseSection>

      <ShowcaseSection eyebrow="Rhythm" title="Spacing scale">
        <SpacingShowcase />
      </ShowcaseSection>

      <ShowcaseSection eyebrow="დერმაკო" title="Header & footer preview">
        <HeaderFooterPreview />
      </ShowcaseSection>

      <ShowcaseSection eyebrow="Responsive" title="Desktop / tablet / mobile behavior">
        <ResponsiveShowcase />
      </ShowcaseSection>
    </div>
  );
};
