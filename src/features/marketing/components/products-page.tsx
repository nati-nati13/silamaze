import { Suspense } from 'react';

import { ProductCatalogFilterBar } from '@/features/marketing/components/products/catalog-filter-bar';
import { ProductCategoryGrid } from '@/features/marketing/components/products/category-grid';
import { ProductsHero } from '@/features/marketing/components/products/hero';
import { ProductHowToChoose } from '@/features/marketing/components/products/how-to-choose';
import { ProductTrustBadges } from '@/features/marketing/components/products/trust-badges';
import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';

export const ProductsPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ProductsHero />
        <Suspense fallback={null}>
          <ProductCategoryGrid />
        </Suspense>
        <Suspense fallback={null}>
          <ProductCatalogFilterBar />
        </Suspense>
        <ProductHowToChoose />
        <ProductTrustBadges />
      </main>
      <Footer />
    </div>
  );
};
