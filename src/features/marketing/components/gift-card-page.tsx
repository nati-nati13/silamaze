import { GiftCardBenefits } from '@/features/gift-card/components/gift-card-benefits';
import { GiftCardCtaBanner } from '@/features/gift-card/components/gift-card-cta-banner';
import { GiftCardFaq } from '@/features/gift-card/components/gift-card-faq';
import { GiftCardGallery } from '@/features/gift-card/components/gift-card-gallery';
import { GiftCardHero } from '@/features/gift-card/components/gift-card-hero';
import { GiftCardHowTo } from '@/features/gift-card/components/gift-card-how-to';
import { GiftCardRulesBanner } from '@/features/gift-card/components/gift-card-rules-banner';
import { GiftCardSelectionPreview } from '@/features/gift-card/components/gift-card-selection-preview';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';

export const GiftCardPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <GiftCardHero />
        <GiftCardBenefits />
        <GiftCardGallery />
        <GiftCardSelectionPreview />
        <GiftCardRulesBanner />
        <GiftCardHowTo />
        <GiftCardFaq />
        <GiftCardCtaBanner />
      </main>
      <Footer />
    </div>
  );
};
