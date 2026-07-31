'use client';
import { createContext, useContext } from 'react';
import { useStore, StoreApi } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import { CartStore, CartStoreType } from '@/features/cart/types/cart.types';

export const CartStoreContext = createContext<StoreApi<CartStore> | null>(null);

export const useCartStore = () => {
  const store = useContext(CartStoreContext);
  if (!store) throw new Error('useCartStore must be used within StoreProvider');
  return useStore(
    store,
    useShallow((state: CartStoreType) => ({
      items: state.items,
      addItem: state.addItem,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
      clearCart: state.clearCart,
      totalItems: state.totalItems(),
      totalAmount: state.totalAmount(),
    }))
  );
};
