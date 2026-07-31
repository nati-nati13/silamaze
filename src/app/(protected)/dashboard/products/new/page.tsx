import { ProductForm } from '@/features/product/components/product-form';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'პროდუქტის დამატება — Admin',
};

export default function NewProductAdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">პროდუქტის დამატება</h1>
      <div className="max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-8">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
