import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import { CartState, CartStore } from '@/features/cart/types/cart.types';

export const CART_STORAGE_KEY = 'silamaze-cart';

export const createCartStore = (initState: Partial<CartState> = {}) => {
  const DEFAULT_STATE: CartState = {
    items: [],
  };

  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        ...DEFAULT_STATE,
        ...initState,
        addItem: (item) =>
          set((state) => {
            const existing = state.items.find((i) => i.productId === item.productId);
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.productId === item.productId
                    ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
                    : i
                ),
              };
            }
            return { items: [...state.items, { ...item, quantity: item.quantity ?? 1 }] };
          }),
        removeItem: (productId) =>
          set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
        updateQuantity: (productId, quantity) =>
          set((state) => {
            if (quantity <= 0) {
              return { items: state.items.filter((i) => i.productId !== productId) };
            }
            return {
              items: state.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
            };
          }),
        clearCart: () => set({ items: [] }),
        totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
        totalAmount: () =>
          get().items.reduce((sum, i) => sum + (i.discountPrice ?? i.price) * i.quantity, 0),
      }),
      {
        name: CART_STORAGE_KEY,
        skipHydration: true,
        partialize: (state) => ({ items: state.items }),
      }
    )
  );
};
