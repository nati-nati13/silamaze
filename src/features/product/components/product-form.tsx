'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ProductFormBasicFields } from '@/features/product/components/product-form-basic-fields';
import { ProductFormInventoryFields } from '@/features/product/components/product-form-inventory-fields';
import { ProductFormPricingFields } from '@/features/product/components/product-form-pricing-fields';
import type { Product } from '@/features/product/types/product.types';
import {
  fromCommaList,
  ProductFormSchema,
  toCommaList,
  type ProductFormValues,
} from '@/features/product/validations/product-form.validation';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';
import { http } from '@/shared/lib/http';
import { slugify } from '@/shared/utils/format';

type Props = {
  mode: 'create' | 'edit';
  product?: Product;
};

export const ProductForm = ({ mode, product }: Props) => {
  const router = useRouter();
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: product?.name ?? '',
      slug: product?.slug ?? '',
      description: product?.description ?? '',
      division: product?.division ?? 'beauty',
      category: product?.category ?? '',
      brand: product?.brand ?? '',
      price: product?.price ?? 0,
      discountPrice: product?.discountPrice ?? undefined,
      skinType: toCommaList(product?.skinType ?? []),
      skinConcern: toCommaList(product?.skinConcern ?? []),
      sku: product?.sku ?? '',
      stock: product?.stock ?? 0,
      isActive: product?.isActive ?? true,
    },
  });

  const nameValue = form.watch('name');

  useEffect(() => {
    if (!slugTouched) {
      form.setValue('slug', slugify(nameValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameValue, slugTouched]);

  const onSubmit = async (values: ProductFormValues) => {
    setError(null);
    const payload = {
      name: values.name,
      slug: values.slug,
      description: values.description ?? '',
      division: values.division,
      category: values.category || undefined,
      brand: values.brand ?? '',
      price: values.price,
      discountPrice: values.discountPrice ?? null,
      skinType: fromCommaList(values.skinType),
      skinConcern: fromCommaList(values.skinConcern),
      sku: values.sku || null,
      stock: values.stock ?? 0,
      isActive: values.isActive,
    };

    try {
      if (mode === 'create') {
        await http.post('/products', payload);
      } else {
        await http.patch(`/products/${product?.id}`, payload);
      }
      router.push('/dashboard/products');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'შეცდომა. სცადეთ კვლავ.';
      setError(message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <ProductFormBasicFields form={form} onSlugTouched={() => setSlugTouched(true)} />
        <ProductFormPricingFields form={form} />
        <ProductFormInventoryFields form={form} />

        {error && <p className="text-sm font-medium text-destructive">{error}</p>}

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'შენახვა...' : mode === 'create' ? 'შექმნა' : 'შენახვა'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push('/dashboard/products')}>
            გაუქმება
          </Button>
        </div>
      </form>
    </Form>
  );
};
