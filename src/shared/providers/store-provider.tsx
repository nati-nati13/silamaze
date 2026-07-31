'use client';
import { type ReactNode, useEffect, useState } from 'react';
import { type StoreApi } from 'zustand';

import { AuthStoreContext } from '@/features/auth/hooks/useAuthStore';
import { createAuthStore } from '@/features/auth/store/auth-store';
import { AuthStore } from '@/features/auth/types/auth.types';
import { CartStoreContext } from '@/features/cart/hooks/useCartStore';
import { createCartStore } from '@/features/cart/store/cart-store';

export type StoreProviderProps = { children: ReactNode };

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [authStore] = useState<StoreApi<AuthStore>>(() => createAuthStore());
  const [cartStore] = useState<ReturnType<typeof createCartStore>>(() => createCartStore());

  useEffect(() => {
    cartStore.persist.rehydrate();
  }, [cartStore]);

  return (
    <AuthStoreContext.Provider value={authStore}>
      <CartStoreContext.Provider value={cartStore}>{children}</CartStoreContext.Provider>
    </AuthStoreContext.Provider>
  );
};
