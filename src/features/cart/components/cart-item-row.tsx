'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

import { useCartStore } from '@/features/cart/hooks/useCartStore';
import type { CartItem } from '@/features/cart/types/cart.types';
import { Button } from '@/shared/components/ui/button';

type Props = {
  item: CartItem;
};

export const CartItemRow = ({ item }: Props) => {
  const { updateQuantity, removeItem } = useCartStore();
  const unitPrice = item.discountPrice ?? item.price;

  return (
    <div className="flex items-center gap-3 border-b border-border pb-4">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
        {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-medium text-foreground">{item.name}</p>
        <p className="text-sm text-muted-foreground">{unitPrice} ₾</p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            aria-label="შემცირება"
          >
            <Minus className="size-3" />
          </Button>
          <span className="w-6 text-center text-sm">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            aria-label="გაზრდა"
          >
            <Plus className="size-3" />
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeItem(item.productId)}
        aria-label="წაშლა"
      >
        <Trash2 className="size-4 text-destructive" />
      </Button>
    </div>
  );
};
