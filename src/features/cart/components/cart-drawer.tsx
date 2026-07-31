'use client';

import { ShoppingCart } from 'lucide-react';

import { CartItemRow } from '@/features/cart/components/cart-item-row';
import { useCartStore } from '@/features/cart/hooks/useCartStore';
import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';

export const CartDrawer = () => {
  const { items, totalItems, totalAmount } = useCartStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="კალათა" className="relative">
          <ShoppingCart className="size-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-brand-academy text-xs font-semibold text-primary">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>კალათა</SheetTitle>
          <SheetDescription className="sr-only">კალათაში დამატებული პროდუქტების სია</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">კალათა ცარიელია.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <CartItemRow key={item.productId} item={item} />
              ))}
            </div>
          )}
        </div>

        <SheetFooter className="border-t border-border">
          <div className="flex items-center justify-between text-base font-semibold text-foreground">
            <span>ჯამი</span>
            <span>{totalAmount} ₾</span>
          </div>
          <Button size="lg" disabled={items.length === 0}>
            გადახდაზე გადასვლა
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
