import { notFound } from 'next/navigation';

import { ProductForm } from '@/features/product/components/product-form';
import { getProductByIdService } from '@/features/product/service/product.service';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'პროდუქტის რედაქტირება — Admin',
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductAdminPage({ params }: PageProps) {
  const { id } = await params;
  const { data, status } = await getProductByIdService(id);

  if (status === 404 || !('id' in data)) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">პროდუქტის რედაქტირება</h1>
      <div className="max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-8">
        <ProductForm mode="edit" product={data} />
      </div>
    </div>
  );
}
