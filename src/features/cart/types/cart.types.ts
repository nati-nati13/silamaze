export type CartItem = {
  productId: string;
  name: string;
  price: number;
  discountPrice?: number;
  image?: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartActions = {
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalAmount: () => number;
};

export type CartStore = CartState & CartActions;
export type CartStoreType = CartStore;
