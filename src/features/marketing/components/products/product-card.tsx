import Image from 'next/image';

import type { Product } from '@/features/product/types/product.types';
import { PRODUCT_CATEGORIES } from '@/shared/const/product-categories.const';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const categoryLabel = PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.label ?? '';
  const hasDiscount = product.discountPrice !== null && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - (product.discountPrice as number) / product.price) * 100)
    : 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-square bg-muted">
        {product.images[0] && (
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 rounded-full bg-brand-academy px-2 py-1 text-xs font-semibold text-primary">
            -{discountPercent}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {categoryLabel && (
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {categoryLabel}
          </p>
        )}
        <p className="font-heading text-base font-semibold text-foreground">{product.name}</p>
        <div className="mt-auto flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-sm text-muted-foreground line-through">{product.price} ₾</span>
              <span className="font-heading text-lg font-bold text-foreground">
                {product.discountPrice} ₾
              </span>
            </>
          ) : (
            <span className="font-heading text-lg font-bold text-foreground">{product.price} ₾</span>
          )}
        </div>
      </div>
    </div>
  );
};
