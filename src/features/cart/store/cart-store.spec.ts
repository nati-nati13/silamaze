import { describe, it, expect, beforeEach } from 'vitest';

import { createCartStore } from './cart-store';

beforeEach(() => {
  localStorage.clear();
});

describe('cart store', () => {
  it('starts empty', () => {
    const store = createCartStore();
    expect(store.getState().items).toEqual([]);
    expect(store.getState().totalItems()).toBe(0);
    expect(store.getState().totalAmount()).toBe(0);
  });

  it('addItem adds a new item with default quantity 1', () => {
    const store = createCartStore();
    store.getState().addItem({ productId: 'p1', name: 'Cream', price: 50 });

    expect(store.getState().items).toEqual([
      { productId: 'p1', name: 'Cream', price: 50, quantity: 1 },
    ]);
  });

  it('addItem respects an explicit quantity', () => {
    const store = createCartStore();
    store.getState().addItem({ productId: 'p1', name: 'Cream', price: 50, quantity: 3 });

    expect(store.getState().items[0].quantity).toBe(3);
  });

  it('addItem merges quantity when the same productId is added again', () => {
    const store = createCartStore();
    store.getState().addItem({ productId: 'p1', name: 'Cream', price: 50 });
    store.getState().addItem({ productId: 'p1', name: 'Cream', price: 50, quantity: 2 });

    expect(store.getState().items).toHaveLength(1);
    expect(store.getState().items[0].quantity).toBe(3);
  });

  it('removeItem removes the item by productId', () => {
    const store = createCartStore();
    store.getState().addItem({ productId: 'p1', name: 'Cream', price: 50 });
    store.getState().addItem({ productId: 'p2', name: 'Serum', price: 80 });
    store.getState().removeItem('p1');

    expect(store.getState().items).toHaveLength(1);
    expect(store.getState().items[0].productId).toBe('p2');
  });

  it('updateQuantity updates the quantity of an existing item', () => {
    const store = createCartStore();
    store.getState().addItem({ productId: 'p1', name: 'Cream', price: 50 });
    store.getState().updateQuantity('p1', 5);

    expect(store.getState().items[0].quantity).toBe(5);
  });

  it('updateQuantity removes the item when quantity drops to 0 or below', () => {
    const store = createCartStore();
    store.getState().addItem({ productId: 'p1', name: 'Cream', price: 50 });
    store.getState().updateQuantity('p1', 0);

    expect(store.getState().items).toHaveLength(0);
  });

  it('clearCart empties the cart', () => {
    const store = createCartStore();
    store.getState().addItem({ productId: 'p1', name: 'Cream', price: 50 });
    store.getState().addItem({ productId: 'p2', name: 'Serum', price: 80 });
    store.getState().clearCart();

    expect(store.getState().items).toEqual([]);
  });

  it('totalItems sums quantities across all items', () => {
    const store = createCartStore();
    store.getState().addItem({ productId: 'p1', name: 'Cream', price: 50, quantity: 2 });
    store.getState().addItem({ productId: 'p2', name: 'Serum', price: 80, quantity: 3 });

    expect(store.getState().totalItems()).toBe(5);
  });

  it('totalAmount uses discountPrice over price when present', () => {
    const store = createCartStore();
    store.getState().addItem({ productId: 'p1', name: 'Cream', price: 50, discountPrice: 40, quantity: 2 });
    store.getState().addItem({ productId: 'p2', name: 'Serum', price: 80, quantity: 1 });

    expect(store.getState().totalAmount()).toBe(40 * 2 + 80);
  });
});
